import { useAuthContext } from "@/contexts/authContext";
import { type IRoom } from "@/types/IRoom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, LogOut, Trash2, Users } from "lucide-react";

interface RoomMembersDialogProps {
  room: IRoom;
  onLeaveRoom: () => void;
  onCloseRoom: () => void;
  trigger?: React.ReactNode;
}

export function RoomMembersDialog({
  room,
  onLeaveRoom,
  onCloseRoom,
  trigger,
}: RoomMembersDialogProps) {
  const { authUser } = useAuthContext();
  const currentUserId = authUser?._id;
  const isHost = room.host_id === currentUserId;

  return (
    <Dialog>
      <DialogTrigger>
        {trigger || (
          <button className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full cursor-pointer">
            <Users size={14} />
            <span>Members ({room.participants?.length || 0})</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md w-full bg-[#0d0d0d] text-white border border-neutral-800 p-6 rounded-2xl shadow-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2.5 text-neutral-100">
            <Users className="text-purple-500" size={20} />
            <span>Room Members</span>
            <span className="text-xs font-normal text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md">
              {room.participants?.length || 0} active
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Member List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {room.participants?.map((member) => {
            const isMemberHost = room.host_id === member._id;
            const isCurrentUser = member._id === currentUserId;

            return (
              <div
                key={member._id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${isCurrentUser
                  ? "bg-purple-950/20 border-purple-500/35 hover:bg-purple-950/30"
                  : "bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900/60"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm tracking-wide ${isMemberHost
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "bg-purple-500/10 text-purple-400 border border-purple-500/35"
                      }`}
                  >
                    {member.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                      {member.username}
                      {isCurrentUser && (
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 font-semibold px-1.5 py-0.5 rounded border border-purple-500/20">
                          You
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      {isMemberHost ? "Room Creator" : "Viewer"}
                    </span>
                  </div>
                </div>

                {isMemberHost && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Crown size={10} className="fill-amber-400/20" /> Host
                  </span>
                )}
              </div>
            );
          })}

          {!room.participants || room.participants.length === 0 ? (
            <div className="text-center py-6 text-neutral-500 text-xs">
              No members in this room.
            </div>
          ) : null}
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-col gap-2">
          {isHost ? (
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-red-950/20 cursor-pointer active:scale-[0.98]"
              onClick={onCloseRoom}
            >
              <Trash2 size={16} />
              <span>Close Watch Party</span>
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-red-950/20 cursor-pointer active:scale-[0.98]"
              onClick={onLeaveRoom}
            >
              <LogOut size={16} />
              <span>Leave Watch Party</span>
            </Button>
          )}
          <p className="text-[10px] text-neutral-500 text-center mt-1.5 leading-relaxed">
            {isHost
              ? "As the host, closing the room will terminate the stream and disconnect all viewers immediately."
              : "Leaving the room will return you to the home dashboard. You can re-join later using the join code/link."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
