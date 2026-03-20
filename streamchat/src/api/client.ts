import axios from "axios";

// Create an Axios instance configured for our API gateway
export const apiClient = axios.create({
  // In development, Vite proxys to the backend. In production, NGINX handles this.
  // Using an empty baseURL assumes the API is hosted on the same domain or proxied.
  baseURL: "/", 
  withCredentials: true, // Necessary to send and receive HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// We need a way to store requests while the token is being refreshed
// so we don't spam the refresh endpoint if multiple requests fail at 401.
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Attempt to get the accessToken from localStorage
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // IMPORTANT: If error is 401 and it's NOT a retry request AND not the refresh endpoint itself
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this failed request and wait for the new token
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call the backend /refresh endpoint.
        // `withCredentials: true` ensures the `jwt_refreshToken` cookie is sent.
        const res = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // Store the new token
        localStorage.setItem("accessToken", newAccessToken);
        
        // Update the default config headers for future requests
        apiClient.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
        originalRequest.headers.Authorization = "Bearer " + newAccessToken;

        // Resolve queued requests with the new token
        processQueue(null, newAccessToken);
        
        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refreshing fails (e.g. refresh token is also expired),
        // reject queued requests, clear localStorage, and optionally redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        // E.g., window.location.href = "/signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
