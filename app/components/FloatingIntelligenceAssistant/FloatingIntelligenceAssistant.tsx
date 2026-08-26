"use client";

import styles from
  "./FloatingIntelligenceAssistant.module.css";
import {
  floatingAssistantContent,
  type FloatingAssistantLanguage,
} from "./content";
import { useFloatingAssistant } from
  "./useFloatingAssistant";

type FloatingIntelligenceAssistantProps = {
  language: FloatingAssistantLanguage;
  open: boolean;
  onOpen: () => void;
};

function IntelligenceCore() {
  return (
    <span className={styles.core} aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <circle
          className={styles.coreOuter}
          cx="32"
          cy="32"
          r="25"
        />

        <circle
          className={styles.coreOrbit}
          cx="32"
          cy="32"
          r="18"
        />

        <path
          className={styles.coreSignal}
          d="M32 4v8M32 52v8M4 32h8M52 32h8"
        />

        <path
          className={styles.coreSignal}
          d="m12.2 12.2 5.7 5.7M46.1 46.1l5.7 5.7M51.8 12.2l-5.7 5.7M17.9 46.1l-5.7 5.7"
        />

        <circle
          className={styles.coreCenter}
          cx="32"
          cy="32"
          r="8"
        />

        <circle
          className={styles.corePulse}
          cx="32"
          cy="32"
          r="3"
        />
      </svg>

      <i className={styles.onlineIndicator} />
    </span>
  );
}

export default function FloatingIntelligenceAssistant({
  language,
  open,
  onOpen,
}: FloatingIntelligenceAssistantProps) {
  const content =
    floatingAssistantContent[language];

  const isArabic = language === "ar";

  const {
    visible,
    invitationVisible,
    dismissInvitation,
  } = useFloatingAssistant();

  const assistantVisible = visible && !open;

  return (
    <aside
      className={styles.assistant}
      data-visible={assistantVisible}
      data-invitation={invitationVisible}
      data-language={language}
      dir={isArabic ? "rtl" : "ltr"}
      aria-hidden={!assistantVisible}
    >
      {invitationVisible && (
        <div
          className={styles.invitation}
          role="status"
        >
          <button
            type="button"
            className={styles.dismiss}
            aria-label={
              content.invitation.dismiss
            }
            onClick={dismissInvitation}
          >
            ×
          </button>

          <button
            type="button"
            className={styles.invitationAction}
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-controls="ahmed-intelligence-dialog"
          >
            <span>
              <small>
                {content.invitation.eyebrow}
              </small>

              <strong>
                {content.invitation.title}
              </strong>

              <em>
                {content.invitation.action}
                <i aria-hidden="true">↗</i>
              </em>
            </span>
          </button>
        </div>
      )}

      <button
        type="button"
        className={styles.trigger}
        onClick={onOpen}
        aria-label={content.ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="ahmed-intelligence-dialog"
        tabIndex={assistantVisible ? 0 : -1}
      >
        <IntelligenceCore />

        <span className={styles.triggerCopy}>
          <small>
            <i aria-hidden="true" />
            {content.status}
          </small>

          <strong>{content.name}</strong>
          <em>{content.action}</em>
        </span>
      </button>
    </aside>
  );
}
