import { ERROR_MESSAGES, HttpStatusCode } from "@/constants/errors";
import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { toast } from "sonner";

// ================================ API Configuration ================================ //
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://swapi.dev/api";
const API_TIMEOUT_MS = Number(
  process.env.NEXT_PUBLIC_API_TIMEOUT_MS?.trim() || "10000"
);

// ================================ Axios instance ================================ //
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: Number.isFinite(API_TIMEOUT_MS) ? API_TIMEOUT_MS : 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================ Request interceptor ================================ //
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================================ Response interceptor ================================ //
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`${response.status} ${response.config.url}`);
    }

    return response;
  },
  async (error: AxiosError) => {
    // Only show toasts in browser environment
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    if (process.env.NODE_ENV === "development") {
      console.error(
        `${error.response?.status || "Network"} ${error.config?.url}`
      );
    }

    if (error.response) {
      const { status } = error.response;

      // ===== Specific status codes ===== //
      if (status in ERROR_MESSAGES) {
        const message = ERROR_MESSAGES[status as HttpStatusCode];
        toast.error(message.title, { description: message.description });
      }
      // ===== Server errors (5xx) ===== //
      else if (status >= 500) {
        toast.error("Server Error", {
          description: "Our servers are having issues. Please try again later.",
        });
      }
      // ===== User errors (4xx) ===== //
      else if (status >= 400 && !(status in ERROR_MESSAGES)) {
        toast.error("Request Failed", {
          description: "Something went wrong with your request.",
        });
      }
    } else {
      // ===== Network errors, timeouts, etc. ===== //
      const axiosErr = error as AxiosError & { code?: string };
      const isTimeout = axiosErr.code === "ECONNABORTED";

      if (isTimeout) {
        toast.error("Request Timeout", {
          description: "The request took too long. Please try again.",
        });
      } else {
        toast.error("Connection Error", {
          description: "Please check your internet connection and try again.",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
