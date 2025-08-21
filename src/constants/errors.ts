export type HttpStatusCode =
  | 400
  | 401
  | 403
  | 404
  | 405
  | 408
  | 422
  | 429
  | 500
  | 502
  | 503;

export type ErrorMessage = {
  title: string;
  description: string;
};

export const ERROR_MESSAGES: Record<HttpStatusCode, ErrorMessage> = {
  400: { title: "Bad Request", description: "The request was invalid." },
  401: { title: "Unauthorized", description: "Please log in to continue." },
  403: {
    title: "Access Forbidden",
    description: "You don't have permission for this action.",
  },
  404: {
    title: "Not Found",
    description: "The requested resource wasn't found.",
  },
  405: {
    title: "Method Not Allowed",
    description: "This action isn't supported.",
  },
  408: { title: "Request Timeout", description: "The request took too long." },
  422: {
    title: "Unprocessable Entity",
    description: "The request data is invalid.",
  },
  429: {
    title: "Too Many Requests",
    description: "Please slow down and try again.",
  },
  500: {
    title: "Server Error",
    description: "Something went wrong. Please try again.",
  },
  502: { title: "Bad Gateway", description: "Server communication error." },
  503: {
    title: "Service Unavailable",
    description: "Service is temporarily unavailable.",
  },
} as const;
