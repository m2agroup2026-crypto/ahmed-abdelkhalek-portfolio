"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

export function useFloatingAssistant() {
  const visible = true;
  const [footerVisible, setFooterVisible] =
    useState(false);
  const [invitationDismissed, setInvitationDismissed] =
    useState(false);

  useEffect(() => {
    const footer = document.getElementById("portfolio-footer");

    if (!footer) {
      return undefined;
    }

    let footerObserver: IntersectionObserver | null = null;

    const connectObserver = () => {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          const isVisible = Boolean(entry?.isIntersecting);
          setFooterVisible(isVisible);

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
    };

    const timeout = window.setTimeout(connectObserver, 400);

    return () => {
      window.clearTimeout(timeout);
      footerObserver?.disconnect();
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
