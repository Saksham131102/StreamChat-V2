import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/contexts/authContext";
import type { IChatMessage } from "@/types/IRoom";
import { MessageSquare, Send, Sparkles } from "lucide-react";

interface RoomChatProps {
  roomId: string;
  mediaTitle: string;
}

export function RoomChat({ roomId, mediaTitle }: RoomChatProps) {
  const { authUser } = useAuthContext();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages once when mediaTitle is loaded
  useEffect(() => {
    setMessages([
      {
        _id: "msg-1",
        userId: "system",
        username: "System",
        message: `Welcome to the watch party for "${mediaTitle || "Movie"}"!🍿`,
        timestamp: new Date(Date.now() - 600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        _id: "msg-2",
        userId: "user-2",
        username: "alex_jones",
        message: "Hey guys! Thanks for setting this up. Ready for the movie!",
        timestamp: new Date(Date.now() - 300000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        _id: "msg-3",
        userId: "user-3",
        username: "movie_critic99",
        message: "Trailer looks insane. Glad we are watching this one.",
        timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [roomId, mediaTitle]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: IChatMessage = {
      _id: `msg-${Date.now()}`,
      userId: authUser?._id || "current-user-id",
      username: authUser?.username || "You",
      message: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");

    // Simulate automated mock replies after a short delay
    setTimeout(() => {
      const responses = [
        "omg that scene was crazy!",
        "haha true!",
        "Wait, watch that detail on screen 👀",
        "The background score is incredibly dramatic here.",
        "absolutely loving this watch party feature!",
      ];
      const randomUser = ["alex_jones", "movie_critic99", "emma_watson"][Math.floor(Math.random() * 3)];
      const randomMsg = responses[Math.floor(Math.random() * responses.length)];

      const mockReply: IChatMessage = {
        _id: `msg-reply-${Date.now()}`,
        userId: `user-reply-${Math.random()}`,
        username: randomUser,
        message: randomMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, mockReply]);
    }, 2500);
  };

  return (
    <div className="bg-[#070707] border border-neutral-900 rounded-2xl h-[560px] lg:h-[calc(100vh-220px)] min-h-[500px] flex flex-col overflow-hidden shadow-2xl relative">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-neutral-900 bg-neutral-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-purple-500" size={18} />
          <span className="font-bold text-sm text-neutral-200 tracking-tight">Live Discussion</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>{messages.filter((m) => m.userId !== "system").length} messages</span>
        </div>
      </div>

      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {messages.map((msg) => {
          const isMe = msg.userId === (authUser?._id || "current-user-id");
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
                <p className="m-0 break-words font-normal whitespace-pre-wrap">{msg.message}</p>
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
          placeholder="React to the movie..."
          className="flex-1 bg-neutral-900/60 hover:bg-neutral-900/90 focus:bg-neutral-900 border border-neutral-800/80 focus:border-purple-600/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all duration-200"
        />
        <button
          type="submit"
          disabled={!chatInput.trim()}
          className="h-10 w-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-900 text-white disabled:text-neutral-600 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-lg shadow-purple-900/10"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
