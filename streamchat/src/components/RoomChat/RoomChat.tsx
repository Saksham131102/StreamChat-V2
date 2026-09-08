import { useEffect, useRef, useState, useCallback } from "react";
import { useAuthContext } from "@/contexts/authContext";
import type { IChatMessage } from "@/types/IRoom";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { fetchRoomMessagesAPI } from "@/api/chat";
import { MessageSquare, Send, Sparkles, Wifi, WifiOff } from "lucide-react";

interface RoomChatProps {
  roomId: string;
  mediaTitle: string;
  onUserJoined?: (user: { userId: string; username: string }) => void;
  onUserLeft?: (user: { userId: string }) => void;
  onRoomClosed?: () => void;
}

export function RoomChat({ roomId, mediaTitle, onUserJoined, onUserLeft, onRoomClosed }: RoomChatProps) {
  const { authUser } = useAuthContext();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<ReturnType<typeof getSocket> | null>(null);

  // ── Load chat history on mount ───────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function loadHistory() {
      try {
        const res = await fetchRoomMessagesAPI(roomId);
        if (cancelled) return;
        const history: IChatMessage[] = res.data.data.messages.map((m) => ({
          _id: m._id,
          userId: m.userId,
          username: m.username,
          message: m.message,
          timestamp: new Date(m.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages((prev) => [...prev, ...history]);
      } catch (err) {
        console.error("[Chat] Failed to load history:", err);
      }
    }
    loadHistory();
    return () => { cancelled = true; };
  }, [roomId]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket.IO setup
  useEffect(() => {
    if (!authUser?._id || !authUser?.username) return;

    const socket = getSocket(authUser._id, authUser.username);
    socketRef.current = socket;

    // ── Event handlers ──────────────────────────────────────────────────────

    const handleConnect = () => {
      setIsConnected(true);
      // Join the room immediately after connecting
      socket.emit("join_room", { roomId });
      // Welcome system message appended after history
      setMessages((prev) => [
        ...prev,
        {
          _id: `system-${Date.now()}`,
          userId: "system",
          username: "System",
          message: `Welcome to the watch party for "${mediaTitle || "Movie"}"! 🍿`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleNewMessage = (msg: {
      _id: string;
      userId: string;
      username: string;
      message: string;
      timestamp: string;
    }) => {
      const chatMsg: IChatMessage = {
        _id: msg._id,
        userId: msg.userId,
        username: msg.username,
        message: msg.message,
        timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, chatMsg]);
    };

    const handleError = (err: { message: string }) => {
      console.error("[Socket] Error:", err.message);
    };

    const handleUserJoined = (data: { userId: string; username: string }) => {
      // System announcement in chat
      setMessages((prev) => [
        ...prev,
        {
          _id: `system-join-${data.userId}-${Date.now()}`,
          userId: "system",
          username: "System",
          message: `${data.username} joined the watch party 🎉`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      // Notify parent to update the participants list
      onUserJoined?.(data);
    };

    const handleUserLeft = (data: { userId: string; username?: string }) => {
      // System announcement in chat
      const displayName = data.username || "A participant";
      setMessages((prev) => [
        ...prev,
        {
          _id: `system-leave-${data.userId}-${Date.now()}`,
          userId: "system",
          username: "System",
          message: `${displayName} left the watch party 👋`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      // Notify parent to remove them from the participants list
      onUserLeft?.(data);
    };

    const handleRoomClosed = () => {
      onRoomClosed?.();
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("new_message", handleNewMessage);
    socket.on("error", handleError);
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);
    socket.on("room_closed", handleRoomClosed);

    // Connect if not already
    if (!socket.connected) {
      socket.connect();
    } else {
      // Already connected from a previous mount — rejoin room
      socket.emit("join_room", { roomId });
      setIsConnected(true);
    }

    return () => {
      socket.emit("leave_room", { roomId });
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("new_message", handleNewMessage);
      socket.off("error", handleError);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);
      socket.off("room_closed", handleRoomClosed);
      disconnectSocket();
    };
  }, [authUser?._id, authUser?.username, roomId, mediaTitle]);

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = chatInput.trim();
      if (!trimmed || !socketRef.current?.connected) return;

      socketRef.current.emit("send_message", {
        roomId,
        message: trimmed,
      });

      setChatInput("");
    },
    [chatInput, roomId]
  );

  return (
    <div className="bg-[#070707] border border-neutral-900 rounded-2xl h-[560px] lg:h-[calc(100vh-220px)] min-h-[500px] flex flex-col overflow-hidden shadow-2xl relative">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-neutral-900 bg-neutral-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-purple-500" size={18} />
          <span className="font-bold text-sm text-neutral-200 tracking-tight">
            Live Discussion
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Connection status badge */}
          <div
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all duration-300 ${
              isConnected
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                : "text-neutral-500 bg-neutral-900/60 border-neutral-800/60"
            }`}
          >
            {isConnected ? (
              <>
                <Wifi size={11} />
                <span>Live</span>
              </>
            ) : (
              <>
                <WifiOff size={11} />
                <span>Connecting…</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span>{messages.filter((m) => m.userId !== "system").length} messages</span>
          </div>
        </div>
      </div>

      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {messages.map((msg) => {
          const isMe = msg.userId === authUser?._id;
          const isSystem = msg.userId === "system";

          if (isSystem) {
            return (
              <div key={msg._id} className="flex justify-center my-2 select-none">
                <div className="bg-neutral-900/60 border border-neutral-800/80 px-3 py-1.5 rounded-xl text-center max-w-[90%]">
                  <span className="text-[11px] text-neutral-400 font-medium leading-normal flex items-center gap-1.5 justify-center">
                    <Sparkles size={11} className="text-purple-400" />
                    {msg.message}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg._id}
              className={`flex flex-col max-w-[85%] gap-1.5 ${
                isMe ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              {/* Sender Name */}
              <span
                className={`text-[10px] font-bold tracking-wide ${
                  isMe ? "text-purple-400" : "text-neutral-400"
                }`}
              >
                {msg.username}
              </span>

              {/* Message Bubble */}
              <div
                className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed tracking-wide shadow-md ${
                  isMe
                    ? "bg-purple-600 text-white rounded-tr-none shadow-purple-950/10"
                    : "bg-neutral-900 border border-neutral-800/80 text-neutral-200 rounded-tl-none shadow-black/10"
                }`}
              >
                <p className="m-0 break-words font-normal whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>

              {/* Time Badge */}
              <span className="text-[9px] text-neutral-500 tracking-wider px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={handleSendMessage}
        className="p-3.5 bg-neutral-950 border-t border-neutral-950/80 flex items-center gap-2"
      >
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder={isConnected ? "React to the movie…" : "Connecting to chat…"}
          disabled={!isConnected}
          className="flex-1 bg-neutral-900/60 hover:bg-neutral-900/90 focus:bg-neutral-900 border border-neutral-800/80 focus:border-purple-600/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!chatInput.trim() || !isConnected}
          className="h-10 w-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-900 text-white disabled:text-neutral-600 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-lg shadow-purple-900/10 disabled:cursor-not-allowed"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
