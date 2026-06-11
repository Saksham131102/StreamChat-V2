import { useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import type { ILogin } from "../../types/ILogin";
import { loginAPI } from "@/api/auth";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { setAuthUser } = useAuthContext();

  const login = async (data: ILogin) => {
    setError(null);

    // Basic frontend validation
    if (!data.email || !data.password) {
      setError("Please fill out all fields.");
      return false;
    }

    try {
      const response = await loginAPI(data);
      const resData = response.data;

      // Extract the token and the user information
      const { accessToken, ...userData } = resData;

      const mappedUser = {
        _id: userData.id || userData._id,
        ...userData
      };

      // Persist the token
      localStorage.setItem("accessToken", accessToken);

      // Persist the user state (excluding access token based on our context logic)
      localStorage.setItem("user", JSON.stringify(mappedUser));
      
      // Update global context
      setAuthUser(mappedUser);

      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "An error occurred during login. Please try again.";
      setError(errorMessage);
      return false;
    }
  };

  return { login, error };
};
