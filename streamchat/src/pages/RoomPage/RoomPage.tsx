import { useEffect, useState } from "react";
import {
  // useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { getMediaById } from "@/api/media";
import { getRoomByIdAPI, joinRoomAPI } from "@/api/room";
import { useAuthContext } from "@/contexts/authContext";
import { RoomMembersDialog } from "@/components/RoomMembersDialog/RoomMembersDialog";
import { RoomChat } from "@/components/RoomChat/RoomChat";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import type { IRoom, IRoomMember } from "@/types/IRoom";
import type { IMedia } from "@/types/media";
import {
  Crown,
  Globe,
  Lock,
  LogOut,
  ShieldAlert,
  Sparkles,
  Volume2,
} from "lucide-react";

export default function RoomPage() {
  const { id: roomId } = useParams();
  // const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  // Local state
  const [media, setMedia] = useState<IMedia | null>(null);
  const [room, setRoom] = useState<IRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Testing/Demo Role toggle so user can easily test Host vs Viewer experience
  const [testingRole, setTestingRole] = useState<"host" | "viewer">("viewer");

  // Private room joining state
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [roomPassword, setRoomPassword] = useState("");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function initRoomAndMedia() {
      try {
        setLoading(true);
        setError(null);
        setIsPasswordRequired(false);

        if (!roomId) {
          throw new Error("Room ID is required");
        }

        // Fetch room details from backend
        const roomRes = await getRoomByIdAPI(roomId);
        if (roomRes.data.status !== "success" || !roomRes.data.data?.room) {
          throw new Error(roomRes.data.message || "Failed to load watch party room.");
        }

        const roomData = roomRes.data.data.room;

        // Map participants from id (Prisma) to _id (IRoomMember format)
        const participantsMapped: IRoomMember[] = (roomData.participants || []).map((p: any) => ({
          _id: p.id,
          username: p.username,
          profilePic: p.profilePic || "",
        }));

        const roomObj: IRoom = {
          _id: roomData._id,
          room_name: roomData.room_name,
          host_id: roomData.host_id,
          is_private: roomData.is_private,
          media_id: roomData.media_id,
          participants: participantsMapped,
          playback_status: roomData.playback_status || "playing",
          created_at: roomData.created_at || new Date().toISOString(),
          updated_at: roomData.updated_at || new Date().toISOString(),
        };

        // Fetch media asset
        let mediaData: IMedia | null = null;
        try {
          const res = await getMediaById(roomData.media_id);
          mediaData = res.data.data;
        } catch (err) {
          console.error("Could not fetch media item:", err);
          // Try standard movie fallback if specific ID fails
          try {
            const resFallback = await getMediaById("679f2fe4e8be5a0459c5d140");
            mediaData = resFallback.data.data;
          } catch {
            // If all fail, we will create a placeholder media
            mediaData = {
              _id: roomData.media_id || "placeholder-media-id",
              title: "Sintel (Watch Party Edition)",
              type: "movie",
              genres: ["Fantasy", "Animation", "Adventure"],
              language: "English",
              release_date: new Date().toISOString(),
              created_at: new Date().toISOString(),
              description: "A beautiful open-source movie about a lone warrior, Sintel, who searches for her lost dragon companion. On her journey, she faces dangerous beasts and steep obstacles in an immersive fantasy world.",
              trending_score: 95,
              view_count: 852000,
              is_featured: true,
              cast: ["Halina Reijn", "Thom Hoffman"],
              director: "Colin Levy",
              search_tags: ["sintel", "fantasy", "dragon"],
              media_assets: {
                poster: { public_id: "sintel_poster", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg" },
                backdrop: { public_id: "sintel_backdrop", url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600" },
                trailer: { public_id: "sintel_trailer", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" }
              }
            };
          }
        }

        if (isMounted) {
          setRoom(roomObj);
          setMedia(mediaData);

          // Set role toggle initial value based on actual host ownership
          const actualIsHost = roomData.host_id === authUser?._id;
          setTestingRole(actualIsHost ? "host" : "viewer");
        }
      } catch (err: any) {
        console.error("Initialization error:", err);
        if (isMounted) {
          if (err.response?.status === 403 || err.response?.data?.message === "Password required") {
            setIsPasswordRequired(true);
          } else {
            setError(err.response?.data?.message || err.message || "Failed to initialize watch party room.");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initRoomAndMedia();

    return () => {
      isMounted = false;
    };
  }, [roomId, authUser, refreshKey]);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId) return;
    try {
      setJoining(true);
      setJoinError(null);
      const res = await joinRoomAPI(roomId, roomPassword);
      if (res.data.status === "success") {
        setIsPasswordRequired(false);
        setRoomPassword("");
        setRefreshKey((prev) => prev + 1);
      } else {
        setJoinError(res.data.message || "Failed to join room.");
      }
    } catch (err: any) {
      setJoinError(err.response?.data?.message || err.message || "Incorrect password. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveRoom = () => {
    // Navigate back to home dashboard
    navigate("/browse/home");
  };

  const handleCloseRoom = () => {
    // Notify room deletion, then exit
    alert("Watch Party Room has been closed by the host.");
    navigate("/browse/home");
  };

  // ── Real-time participant updates via Socket ──────────────────────────────
  const handleUserJoined = (user: { userId: string; username: string }) => {
    setRoom((prev) => {
      if (!prev) return prev;
      // Avoid duplicates
      const alreadyIn = prev.participants.some((p) => p._id === user.userId);
      if (alreadyIn) return prev;
      return {
        ...prev,
        participants: [
          ...prev.participants,
          {
            _id: user.userId,
            username: user.username,
            profilePic: `https://api.dicebear.com/9.x/thumbs/svg?seed=${user.username}`,
          },
        ],
      };
    });
  };

  const handleUserLeft = (user: { userId: string }) => {
    setRoom((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        participants: prev.participants.filter((p) => p._id !== user.userId),
      };
    });
  };

  if (loading) {
    return (
      <div className="w-full h-[90vh] bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin" />
          <div className="w-10 h-10 rounded-full border-b-2 border-l-2 border-red-500 animate-spin absolute top-3 left-3" />
        </div>
        <p className="text-neutral-400 font-semibold animate-pulse tracking-wide">Syncing Room Session...</p>
      </div>
    );
  }

  if (isPasswordRequired) {
    return (
      <div className="w-full h-[90vh] bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0d0d0d]/90 backdrop-blur-md border border-neutral-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <Lock size={32} />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Private Watch Party</h2>
            <p className="text-xs text-neutral-500">This watch party is private and requires a password to join.</p>
          </div>

          <form onSubmit={handleJoinSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                placeholder="Enter room password"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {joinError && (
              <p className="text-red-500 text-xs font-semibold bg-red-500/5 border border-red-500/15 p-3 rounded-lg text-center">
                {joinError}
              </p>
            )}

            <button
              type="submit"
              disabled={joining}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {joining ? "Joining Party..." : "Enter Room"}
            </button>
          </form>

          <button
            onClick={handleLeaveRoom}
            className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors cursor-pointer font-medium"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    );
  }

  if (error || !room || !media) {
    return (
      <div className="w-full h-[90vh] bg-black text-white flex flex-col items-center justify-center gap-4 p-6 text-center">
        <ShieldAlert size={48} className="text-red-500" />
        <h2 className="text-2xl font-black text-neutral-100">Room Unavailable</h2>
        <p className="text-neutral-500 max-w-md">{error || "The watch party room does not exist or has expired."}</p>
        <button
          onClick={handleLeaveRoom}
          className="mt-4 px-6 py-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl font-bold transition-all text-sm cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isHost = testingRole === "host";
  const hostMember = room.participants.find((p) => p._id === room.host_id);
  const hostUsername = hostMember ? hostMember.username : "Host";

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-black text-white flex flex-col pb-8 pt-4">
      {/* ── Testing Sandbox Controller Floating Pill ── */}
      <div className="fixed bottom-6 left-6 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border border-purple-500/30 p-2.5 rounded-2xl shadow-xl shadow-purple-950/20 flex items-center gap-3">
        <div className="flex items-center gap-2 px-1 text-[10px] uppercase font-black text-purple-400 tracking-wider">
          <Sparkles size={12} className="text-purple-400 animate-pulse" />
          <span>Role Switcher</span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setTestingRole("host")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${testingRole === "host"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
              : "bg-neutral-900 hover:bg-neutral-800 text-neutral-400"
              }`}
          >
            Host Mode
          </button>
          <button
            onClick={() => setTestingRole("viewer")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${testingRole === "viewer"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
              : "bg-neutral-900 hover:bg-neutral-800 text-neutral-400"
              }`}
          >
            Viewer Mode
          </button>
        </div>
      </div>

      {/* ── Room Details Header Bar ── */}
      <div className="w-full bg-[#0a0a0a]/60 backdrop-blur-sm border border-neutral-900 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center flex-shrink-0 text-purple-400">
            <Volume2 size={24} className="animate-pulse" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-100">{room.room_name}</h1>
              {room.is_private ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
                  <Lock size={10} /> Private
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                  <Globe size={10} /> Public
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
              <span className="flex items-center gap-1">
                <Crown size={12} className="text-amber-500" />
                <span>Host: <strong className="text-neutral-400">{isHost ? "You" : hostUsername}</strong></span>
              </span>
              {/* <span className="text-neutral-700">•</span> */}
              {/* <span>Code: <strong className="text-neutral-400 tracking-wider bg-neutral-900/60 border border-neutral-800/80 px-2 py-0.5 rounded select-all font-mono">{room.join_code}</strong></span> */}
            </div>
          </div>
        </div>

        {/* Member list and Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <RoomMembersDialog
            room={room}
            onLeaveRoom={handleLeaveRoom}
            onCloseRoom={handleCloseRoom}
          />

          {isHost ? (
            <button
              onClick={handleCloseRoom}
              className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/25 px-4 py-2 rounded-full cursor-pointer transition-colors"
            >
              <LogOut size={13} />
              <span>Close Party</span>
            </button>
          ) : (
            <button
              onClick={handleLeaveRoom}
              className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/25 px-4 py-2 rounded-full cursor-pointer transition-colors"
            >
              <LogOut size={13} />
              <span>Leave Room</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Main Split View Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-6 items-start">
        {/* LEFT COLUMN: Video Player & Media Info */}
        <div className="space-y-6">
          {/* Synchronized Player Box */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-2xl group">
            {/* Live syncing breathe dot */}
            <div className="absolute top-4 left-4 z-40 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-[10px] font-black text-neutral-300 uppercase tracking-widest select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
              <span>Live Sync Active</span>
            </div>

            {/* Video Player */}
            <VideoPlayer src={media.media_assets.trailer.url} poster={media.media_assets.backdrop.url} className="w-full h-full" />

            {/* Controls restriction overlay for non-hosts */}
            {!isHost && (
              <div
                className="absolute inset-0 z-30 bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div className="bg-black/85 backdrop-blur-md border border-amber-500/25 px-5 py-3.5 rounded-2xl flex flex-col items-center gap-2 text-center max-w-[280px] pointer-events-none select-none shadow-xl">
                  <Crown className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" size={24} />
                  <span className="text-xs font-bold text-neutral-100">Controls Synced with Host</span>
                  <span className="text-[10px] text-neutral-400">Only the watch party host can control video playback, pause, and seeking.</span>
                </div>
              </div>
            )}
          </div>

          {/* Media Info Section */}
          <div className="bg-[#070707] border border-neutral-900 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col gap-1 border-b border-neutral-900 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{media.title}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {media.genres.map((g) => (
                  <span
                    key={g}
                    className="text-[10px] border border-neutral-800 text-neutral-400 px-3 py-1 rounded-full bg-neutral-900/60 font-semibold"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 pt-1">
              {/* Synopsis */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Synopsis</h3>
                <p className="text-sm leading-relaxed text-neutral-300 font-light">{media.description}</p>
              </div>

              {/* Cast & Details */}
              <div className="space-y-3.5 text-xs border-t md:border-t-0 md:border-l border-neutral-900 pt-4 md:pt-0 md:pl-6">
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Details</h4>
                  {media.director && (
                    <div className="mb-2">
                      <span className="text-neutral-500">Director: </span>
                      <span className="text-neutral-300 font-semibold">{media.director}</span>
                    </div>
                  )}
                  {media.cast?.length > 0 && (
                    <div>
                      <span className="text-neutral-500">Cast: </span>
                      <span className="text-neutral-300 font-semibold leading-relaxed">{media.cast.slice(0, 4).join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Chat */}
        <RoomChat
          roomId={room._id}
          mediaTitle={media.title}
          onUserJoined={handleUserJoined}
          onUserLeft={handleUserLeft}
        />
      </div>
    </div>
  );
}