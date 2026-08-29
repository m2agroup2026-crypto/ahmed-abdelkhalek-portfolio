"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

export function useFloatingAssistant() {
  const [visible] = useState(true);
  const [footerVisible, setFooterVisible] =
    useState(false);
  const [invitationDismissed, setInvitationDismissed] =
    useState(false);

  useEffect(() => {
    const footer = document.getElementById("portfolio-footer");

    if (!footer) {
      return undefined;
    }

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting);
        setFooterVisible(isVisible);

        /*
         * Dismissal only applies to the current footer visit.
         * Once the user scrolls back above the footer, reset it so
         * the invitation can appear again on the next visit.
         */
        if (!isVisible) {
          setInvitationDismissed(false);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    footerObserver.observe(footer);

    return () => {
      footerObserver.disconnect();
    };
  }, []);

  const dismissInvitation = useCallback(() => {
    setInvitationDismissed(true);
  }, []);

  return {
    visible,
    invitationVisible:
      visible &&
      footerVisible &&
      !invitationDismissed,
    dismissInvitation,
  };
}
