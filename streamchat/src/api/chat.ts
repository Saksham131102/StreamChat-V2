import { apiClient } from "./client";

export interface IChatMessageResponse {
  _id: string;
  roomId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

/**
 * Fetch all chat messages for a given room (oldest-first).
 * @param roomId  - The room to fetch messages for.
 * @param limit   - Max messages to fetch (default 100, backend max 500).
 */
export const fetchRoomMessagesAPI = (roomId: string, limit = 100) =>
  apiClient.get<{
    status: string;
    data: { messages: IChatMessageResponse[] };
  }>(`/chat/${roomId}`, { params: { limit } });
