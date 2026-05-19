import { apiClient } from "./client";
import type { ICreateRoomResponse } from "../types/ICreateRoomResponse";

export const createRoomAPI = (mediaId: string) =>
  apiClient.post<ICreateRoomResponse>('/rooms', {mediaId});