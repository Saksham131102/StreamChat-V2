import { createRoomAPI } from "@/api/room";
import axios from "axios";
import { useState } from "react";

const useCreateRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createRoom = async (mediaId: string): Promise<string | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const response = await createRoomAPI(mediaId);
      if(response.data.success){
        return response.data.roomId;
      }
      setError(response.data.message);
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message ?? "An error occurred during room creation. Please try again."
        : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return {
    createRoom,
    loading,
    error
  }
}

export default useCreateRoom;