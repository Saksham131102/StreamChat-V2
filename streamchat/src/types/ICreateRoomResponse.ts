export interface ICreateRoomResponse {
  status: string;
  message: string;
  data?: {
    roomId: string;
  }
}