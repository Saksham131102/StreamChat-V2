import { useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "@/api/auth";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const queryClient = useQueryClient();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the backend logout endpoint (clears refresh cookies, invalidates session)
      await logoutAPI();
    } catch (err: any) {
      // Even if the backend request fails (e.g., token already expired),
      // we still want to log the user out locally.
      console.error("Logout API error:", err);
      const errorMessage = err.response?.data?.error || "An error occurred during backend logout.";
      setError(errorMessage);
    } finally {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Clear React Query cache so old user data doesn't persist for the next user
      queryClient.clear();

      // Clear the user from global context
      setAuthUser(null);
      
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};
