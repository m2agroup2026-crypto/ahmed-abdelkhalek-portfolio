"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  INTELLIGENCE_LIMITS,
  type IntelligenceMessage,
  type IntelligenceResponse,
} from "../../lib/intelligence-contract";
import {
  intelligenceExperienceContent,
  type IntelligenceExperienceLanguage,
} from "./content";

export type IntelligenceChatStatus =
  | "ready"
  | "thinking"
  | "error";

export type IntelligenceChatMessage =
  IntelligenceMessage & {
    id: string;
  };

function createMessageId() {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return crypto.randomUUID();
  }

  return [
    Date.now().toString(36),
    Math.random().toString(36).slice(2),
  ].join("-");
}

export function useIntelligenceChat(
  language: IntelligenceExperienceLanguage
) {
  const content =
    intelligenceExperienceContent[language];

  const [messages, setMessages] = useState<
    IntelligenceChatMessage[]
  >([]);

  const [status, setStatus] =
    useState<IntelligenceChatStatus>("ready");

  const [notice, setNotice] =
    useState<string | null>(null);

  const [failedHistory, setFailedHistory] =
    useState<IntelligenceChatMessage[] | null>(null);

  const controllerRef =
    useRef<AbortController | null>(null);

  const mountedRef = useRef(true);
  const manuallyStoppedRef = useRef(false);
  const requestNumberRef = useRef(0);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, []);

  const requestResponse = useCallback(
    async (
      history: IntelligenceChatMessage[]
    ) => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;
      manuallyStoppedRef.current = false;

      const requestNumber =
        requestNumberRef.current + 1;

      requestNumberRef.current = requestNumber;

      setStatus("thinking");
      setNotice(null);
      setFailedHistory(null);

      try {
        const response = await fetch(
          "/api/intelligence",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            signal: controller.signal,
            body: JSON.stringify({
              messages: history
                .slice(
                  -INTELLIGENCE_LIMITS
                    .maxHistoryMessages
                )
                .map(({ role, text }) => ({
                  role,
                  text,
                })),
              language,
            }),
          }
        );

        let data: IntelligenceResponse;

        try {
          data =
            await response.json() as
              IntelligenceResponse;
        } catch {
          throw new Error(content.notices.network);
        }

        if (!response.ok || !data.ok) {
          throw new Error(
            !data.ok
              ? data.error.message
              : content.notices.network
          );
        }

        if (
          !mountedRef.current ||
          requestNumber !== requestNumberRef.current
        ) {
          return;
        }

        const assistantMessage:
          IntelligenceChatMessage = {
            id: createMessageId(),
            role: "assistant",
            text: data.text,
          };

        setMessages((current) => [
          ...current,
          assistantMessage,
        ]);

        setStatus("ready");
        setNotice(null);
        setFailedHistory(null);
      } catch (error) {
        if (
          !mountedRef.current ||
          requestNumber !== requestNumberRef.current
        ) {
          return;
        }

        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          setStatus("ready");

          setNotice(
            manuallyStoppedRef.current
              ? content.notices.stopped
              : content.notices.network
          );

          return;
        }

        setStatus("error");

        setNotice(
          error instanceof Error
            ? error.message
            : content.notices.network
        );

        setFailedHistory(history);
      } finally {
        if (
          requestNumber === requestNumberRef.current
        ) {
          controllerRef.current = null;
        }
      }
    },
    [content.notices, language]
  );

  const sendMessage = useCallback(
    async (value: string) => {
      if (status === "thinking") {
        return false;
      }

      const text = value.trim();

      if (!text) {
        setNotice(content.notices.empty);
        return false;
      }

      if (
        text.length >
        INTELLIGENCE_LIMITS.maxMessageCharacters
      ) {
        setNotice(content.notices.tooLong);
        return false;
      }

      const userMessage:
        IntelligenceChatMessage = {
          id: createMessageId(),
          role: "user",
          text,
        };

      const nextHistory = [
        ...messages,
        userMessage,
      ];

      setMessages(nextHistory);
      setNotice(null);

      await requestResponse(nextHistory);

      return true;
    },
    [
      content.notices,
      messages,
      requestResponse,
      status,
    ]
  );

  const sendSuggestion = useCallback(
    (suggestion: string) =>
      sendMessage(suggestion),
    [sendMessage]
  );

  const stopResponse = useCallback(() => {
    if (!controllerRef.current) {
      return;
    }

    manuallyStoppedRef.current = true;
    controllerRef.current.abort();
  }, []);

  const retry = useCallback(async () => {
    if (
      status === "thinking" ||
      !failedHistory
    ) {
      return;
    }

    await requestResponse(failedHistory);
  }, [
    failedHistory,
    requestResponse,
    status,
  ]);

  const clearConversation = useCallback(() => {
    manuallyStoppedRef.current = true;
    controllerRef.current?.abort();
    controllerRef.current = null;
    requestNumberRef.current += 1;

    setMessages([]);
    setStatus("ready");
    setNotice(null);
    setFailedHistory(null);
  }, []);

  const clearNotice = useCallback(() => {
    setNotice(null);

    if (status === "error") {
      setStatus("ready");
    }
  }, [status]);

  return {
    messages,
    status,
    notice,
    isThinking: status === "thinking",
    canRetry:
      status === "error" &&
      failedHistory !== null,
    sendMessage,
    sendSuggestion,
    stopResponse,
    retry,
    clearConversation,
    clearNotice,
  };
}
