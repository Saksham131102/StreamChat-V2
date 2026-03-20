import { useState } from "react";
import { apiClient } from "../../api/client";
import { useAuthContext } from "../../contexts/authContext";
import type { ISignup } from "../../types/ISignup";


export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const { setAuthUser } = useAuthContext();

  const signup = async (data: ISignup) => {
    setError(null);

    // Basic frontend validation
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      setError("Please fill out all fields.");
      return false;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    try {
      const response = await apiClient.post("/auth/signup", data);
      const resData = response.data;

      // Extract the token and the user information
      const { accessToken, ...userData } = resData;

      // Persist the token
      localStorage.setItem("accessToken", accessToken);

      // Persist the user state (excluding access token based on our context logic)
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Update global context
      setAuthUser(userData);

      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "An error occurred during signup. Please try again.";
      setError(errorMessage);
      return false;
    }
  };

  return { signup, error };
};
