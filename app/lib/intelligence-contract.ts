export const INTELLIGENCE_LIMITS = {
  maxHistoryMessages: 12,
  maxMessageCharacters: 4000,
  maxRequestCharacters: 18000,
  requestTimeoutMs: 30000,
} as const;

export const INTELLIGENCE_ERROR_CODES = {
  invalidRequest: "INVALID_REQUEST",
  emptyMessage: "EMPTY_MESSAGE",
  requestTooLarge: "REQUEST_TOO_LARGE",
  unavailable: "INTELLIGENCE_UNAVAILABLE",
  timeout: "INTELLIGENCE_TIMEOUT",
  upstreamFailure: "UPSTREAM_FAILURE",
} as const;

export type IntelligenceLanguage = "ar" | "en";

export type IntelligenceRole =
  | "user"
  | "assistant";

export type IntelligenceMessage = {
  role: IntelligenceRole;
  text: string;
};

export type IntelligenceRequest = {
  messages: IntelligenceMessage[];
  language: IntelligenceLanguage;
};

export type IntelligenceSuccessResponse = {
  ok: true;
  text: string;
};

export type IntelligenceErrorCode =
  typeof INTELLIGENCE_ERROR_CODES[
    keyof typeof INTELLIGENCE_ERROR_CODES
  ];

export type IntelligenceErrorResponse = {
  ok: false;
  error: {
    code: IntelligenceErrorCode;
    message: string;
  };
};

export type IntelligenceResponse =
  | IntelligenceSuccessResponse
  | IntelligenceErrorResponse;
