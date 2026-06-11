import { apiClient } from "./client";
import type { ICreateRoomResponse } from "../types/ICreateRoomResponse";

export interface ICreateRoomPayload {
  media_id: string;
  room_name: string;
  is_private: boolean;
  password?: string;
}

export const createRoomAPI = (payload: ICreateRoomPayload) =>
  apiClient.post<ICreateRoomResponse>('/rooms/create', payload);

export const getRoomByIdAPI = (roomId: string) =>
  apiClient.post<any>('/rooms/get', { roomId });