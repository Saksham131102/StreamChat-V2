export interface IRoomMember {
  _id: string;
  username: string;
  profilePic: string;
}

export interface IRoom {
  _id: string;
  room_name: string;
  host_id: string;
  is_private: boolean;
  media_id: string;
  participants: IRoomMember[];
  playback_status: "waiting" | "playing" | "paused" | "ended";
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

export interface IChatMessage {
  _id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}
