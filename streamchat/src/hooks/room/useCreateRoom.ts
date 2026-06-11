import { createRoomAPI, type ICreateRoomPayload } from "@/api/room";
import axios from "axios";
import { useState } from "react";

const useCreateRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createRoom = async (payload: ICreateRoomPayload): Promise<string | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const response = await createRoomAPI(payload);
      if (response.data.status === "success") {
        return response.data.data?.roomId;
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