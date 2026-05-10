import { apiClient } from "./client";
import type { ILogin } from "../types/ILogin";
import type { ISignup } from "../types/ISignup";

// API to register a new user
export const signupAPI = (data: ISignup) =>
  apiClient.post("/auth/signup", data);

// API to authenticate an existing user
export const loginAPI = (data: ILogin) =>
  apiClient.post("/auth/login", data);

// API to clear the user's session cookies on the backend
export const logoutAPI = () =>
  apiClient.post("/auth/logout");