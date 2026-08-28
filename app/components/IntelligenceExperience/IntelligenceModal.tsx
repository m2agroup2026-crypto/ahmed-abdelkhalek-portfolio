"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  INTELLIGENCE_LIMITS,
} from "../../lib/intelligence-contract";
import styles from "./IntelligenceModal.module.css";
import {
  intelligenceExperienceContent,
  type IntelligenceExperienceLanguage,
} from "./content";
import { useIntelligenceChat } from "./useIntelligenceChat";
import { useIntelligenceDialog } from "./useIntelligenceDialog";

type IntelligenceModalProps = {
  open: boolean;
  language: IntelligenceExperienceLanguage;
  onClose: () => void;
};

function CoreIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="7" />
      <circle cx="24" cy="24" r="15" />
      <path d="M24 3v6M24 39v6M3 24h6M39 24h6" />
      <path d="m9.2 9.2 4.3 4.3M34.5 34.5l4.3 4.3" />
      <path d="m38.8 9.2-4.3 4.3M13.5 34.5l-4.3 4.3" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m4 4 17 8-17 8 3-8-3-8Z" />
      <path d="M7 12h14" />
    </svg>
  );
}

export default function IntelligenceModal({
  open,
  language,
  onClose,
}: IntelligenceModalProps) {
  const content =
    intelligenceExperienceContent[language];

  const isArabic = language === "ar";

  const [value, setValue] = useState("");

  const streamEndRef =
    useRef<HTMLDivElement>(null);

  const {
    messages,
    status,
    connectionStatus,
    notice,
    isThinking,
    canRetry,
    sendMessage,
    sendSuggestion,
    stopResponse,
    retry,
    clearConversation,
    clearNotice,
  } = useIntelligenceChat(language);

  const {
    dialogRef,
    composerRef,
  } = useIntelligenceDialog({
    open,
    onClose,
  });

  useEffect(() => {
    streamEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isThinking, notice]);

  useEffect(() => {
    if (!open) {
      stopResponse();
    }
  }, [open, stopResponse]);

  const submitValue = () => {
    const text = value.trim();

    if (
      !text ||
      text.length >
        INTELLIGENCE_LIMITS.maxMessageCharacters
    ) {
      void sendMessage(value);
      return;
    }

    setValue("");
    void sendMessage(text);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    submitValue();
  };

  const handleComposerKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return;
    }

    event.preventDefault();
    submitValue();
  };

  const handleClear = () => {
    clearConversation();
    setValue("");
    composerRef.current?.focus();
  };

  const statusLabel =
    connectionStatus === "offline"
      ? content.status.error
      : status === "thinking"
      ? content.status.thinking
      : status === "error"
        ? content.status.error
        : content.status.ready;

  if (
    !open ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return createPortal(
    <div
      className={styles.layer}
      data-state="open"
      data-language={language}
      dir={isArabic ? "rtl" : "ltr"}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={styles.dialog}
        ref={dialogRef}
        id="ahmed-intelligence-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="intelligence-modal-title"
        aria-describedby="intelligence-modal-description"
        tabIndex={-1}
        data-status={status}
      >
        <div
          className={styles.ambient}
          aria-hidden="true"
        >
          <span className={styles.grid} />
          <span className={styles.orbitPrimary} />
          <span className={styles.orbitSecondary} />
          <span className={styles.scan} />
        </div>

        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.coreIcon}>
              <CoreIcon />
            </span>

            <div>
              <p>{content.eyebrow}</p>
              <h2 id="intelligence-modal-title">
                {content.title}
              </h2>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              disabled={
                messages.length === 0 &&
                !isThinking
              }
            >
              {content.actions.clear}
            </button>

            <button
              type="button"
              className={styles.closeButton}
              aria-label={content.actions.close}
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </header>

        <div className={styles.statusBar}>
          <div
            className={styles.status}
            aria-live="polite"
          >
            <i aria-hidden="true" />
            <span>{statusLabel}</span>
          </div>

          <p id="intelligence-modal-description">
            {content.description}
          </p>
        </div>

        <div className={styles.workspace}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCore}>
              <span aria-hidden="true">
                <CoreIcon />
              </span>

              <p>
                <small>COGNITIVE CORE</small>
                <strong>{connectionStatus === "online" ? "ONLINE" : connectionStatus === "offline" ? "OFFLINE" : "CHECKING"}</strong>
              </p>
            </div>

            <div className={styles.suggestions}>
              <p>{content.suggestionsLabel}</p>

              {content.suggestions.map(
                (suggestion, index) => (
                  <button
                    type="button"
                    key={suggestion}
                    disabled={isThinking}
                    onClick={() => {
                      void sendSuggestion(
                        suggestion
                      );
                    }}
                  >
                    <span>
                      0{index + 1}
                    </span>
                    <strong>{suggestion}</strong>
                    <i aria-hidden="true">↗</i>
                  </button>
                )
              )}
            </div>
          </aside>

          <section
            className={styles.conversation}
            aria-label={
              isArabic
                ? "محادثة نواة الذكاء"
                : "Intelligence conversation"
            }
          >
            <div
              className={styles.stream}
              aria-live="polite"
              aria-busy={isThinking}
            >
              {messages.length === 0 && (
                <article
                  className={styles.welcome}
                >
                  <span aria-hidden="true">
                    <CoreIcon />
                  </span>

                  <div>
                    <small>
                      {content.roles.assistant}
                    </small>
                    <h3>
                      {content.welcome.title}
                    </h3>
                    <p>
                      {content.welcome.text}
                    </p>
                  </div>
                </article>
              )}

              {messages.map((message) => (
                <article
                  className={
                    message.role === "assistant"
                      ? styles.assistantMessage
                      : styles.userMessage
                  }
                  key={message.id}
                >
                  <small>
                    {
                      content.roles[
                        message.role
                      ]
                    }
                  </small>

                  <p>{message.text}</p>
                </article>
              ))}

              {isThinking && (
                <article
                  className={styles.thinking}
                  aria-label={
                    content.status.thinking
                  }
                >
                  <small>
                    {content.roles.assistant}
                  </small>

                  <p>
                    <i />
                    <i />
                    <i />
                    <span>
                      {content.status.thinking}
                    </span>
                  </p>
                </article>
              )}

              {notice && (
                <div
                  className={styles.notice}
                  role={
                    status === "error"
                      ? "alert"
                      : "status"
                  }
                >
                  <p>{notice}</p>

                  <div>
                    {canRetry && (
                      <button
                        type="button"
                        onClick={() => {
                          void retry();
                        }}
                      >
                        {content.actions.retry}
                      </button>
                    )}

                    <button
                      type="button"
                      aria-label={
                        content.actions.dismiss
                      }
                      onClick={clearNotice}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <div ref={streamEndRef} />
            </div>

            <form
              className={styles.composer}
              onSubmit={handleSubmit}
            >
              <label htmlFor="intelligence-message">
                {content.composer.label}
              </label>

              <div className={styles.composerField}>
                <textarea
                  id="intelligence-message"
                  ref={composerRef}
                  value={value}
                  rows={2}
                  maxLength={
                    INTELLIGENCE_LIMITS
                      .maxMessageCharacters
                  }
                  disabled={isThinking}
                  placeholder={
                    content.composer.placeholder
                  }
                  onChange={(event) => {
                    setValue(event.target.value);
                    clearNotice();
                  }}
                  onKeyDown={
                    handleComposerKeyDown
                  }
                />

                {isThinking ? (
                  <button
                    type="button"
                    className={styles.stopButton}
                    onClick={stopResponse}
                  >
                    <span aria-hidden="true" />
                    {content.composer.stop}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={styles.sendButton}
                    aria-label={
                      content.composer.send
                    }
                  >
                    <SendIcon />
                    <span>
                      {content.composer.send}
                    </span>
                  </button>
                )}
              </div>

              <div className={styles.composerMeta}>
                <small>
                  {content.composer.hint}
                </small>

                <small>
                  {value.length}/
                  {
                    INTELLIGENCE_LIMITS
                      .maxMessageCharacters
                  }
                </small>
              </div>
            </form>
          </section>
        </div>

        <footer className={styles.footer}>
          <span>
            GEMINI / SECURE SERVER CONNECTION
          </span>
          <p>{content.notices.disclaimer}</p>
        </footer>
      </div>
    </div>,
    document.body
  );
}
