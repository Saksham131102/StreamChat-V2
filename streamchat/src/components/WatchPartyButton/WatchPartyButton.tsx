import useCreateRoom from '@/hooks/room/useCreateRoom';
import { FaUsers } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

type WatchPartyButtonProps = {
    mediaId: string;
};

const WatchPartyButton = ({mediaId}: WatchPartyButtonProps) => {
  const navigate = useNavigate();
  const { createRoom, loading, error} = useCreateRoom();

  const handleCreateRoom = async (): Promise<void> => {
    const roomId = await createRoom(mediaId);
    if(roomId){
      navigate(`/browse/rooms/${roomId}`);
    }
  }

  return (
    <div>
      <button
        onClick={handleCreateRoom}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
      >
        <FaUsers /> Watch Party
    </button>
    {error && <p className="text-red-500 text-sm mt-1">Failed</p>}
    </div>
  )
}

export default WatchPartyButton