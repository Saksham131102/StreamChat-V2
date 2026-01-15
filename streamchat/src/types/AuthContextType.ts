import type { IUser } from "./IUser";

export interface AuthContextType {
  authUser: IUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isLoading: boolean;
}
