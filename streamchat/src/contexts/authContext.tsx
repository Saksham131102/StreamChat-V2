import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType } from "../types/AuthContextType";
import type { IUser } from "../types/IUser";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.id && !parsedUser._id) {
          parsedUser._id = parsedUser.id;
        }
        setAuthUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse auth user: ", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
