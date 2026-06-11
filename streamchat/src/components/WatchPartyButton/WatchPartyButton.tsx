import useCreateRoom from '@/hooks/room/useCreateRoom';
import { FaUsers } from 'react-icons/fa6';
import { Globe, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react';

type WatchPartyButtonProps = {
  mediaId: string;
};

const WatchPartyButton = ({ mediaId }: WatchPartyButtonProps) => {
  const navigate = useNavigate();
  const { createRoom, loading, error } = useCreateRoom();

  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");

  const handleCreateRoom = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!roomName.trim()) return;
    if (isPrivate && !password.trim()) return;

    const roomId = await createRoom({
      media_id: mediaId,
      room_name: roomName,
      is_private: isPrivate,
      password: isPrivate ? password : undefined
    });

    if (roomId) {
      navigate(`/browse/rooms/${roomId}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
        >
          <FaUsers /> Watch Party
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 sm:p-8 bg-black/95 backdrop-blur-md border border-gray-600 text-white rounded-2xl shadow-2xl">
        <DialogTitle className="text-2xl font-bold mb-1">Create Watch Party</DialogTitle>
        <p className="text-sm text-gray-400 mb-6">Host a synchronized movie night with friends.</p>

        <form onSubmit={handleCreateRoom} className="space-y-5">
          {/* Room Name Field */}
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Room Name</label>
            <input
              type="text"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. Weekend Movie Night"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>

          {/* Room Type Buttons */}
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Privacy Setup</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${!isPrivate
                  ? "border-purple-500 bg-purple-500/10 text-purple-400"
                  : "border-gray-600 bg-transparent text-gray-400 hover:border-gray-400 cursor-pointer"
                  }`}
              >
                <Globe size={22} className={!isPrivate ? "text-purple-400" : "text-gray-400"} />
                <span className="text-sm font-semibold">Public Room</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${isPrivate
                  ? "border-red-500 bg-red-500/10 text-red-400"
                  : "border-gray-600 bg-transparent text-gray-400 hover:border-gray-400 cursor-pointer"
                  }`}
              >
                <Lock size={22} className={isPrivate ? "text-red-400" : "text-gray-400"} />
                <span className="text-sm font-semibold">Private Room</span>
              </button>
            </div>
          </div>

          {/* Password Field (Conditional) */}
          {isPrivate && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm text-gray-300 font-medium mb-2">Room Password</label>
              <input
                type="password"
                required={isPrivate}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a secret password"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm font-medium mt-1">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-200 mt-6 shadow-lg ${loading
              ? "opacity-50 cursor-not-allowed bg-purple-600"
              : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 active:scale-[0.98] cursor-pointer shadow-purple-600/30"
              }`}
          >
            {loading ? "Initializing Room..." : "Launch Watch Party"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WatchPartyButton