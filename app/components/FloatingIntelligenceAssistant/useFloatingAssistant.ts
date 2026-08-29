"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type UseFloatingAssistantOptions = {
  heroId?: string;
  contactId?: string;
};

export function useFloatingAssistant({
  heroId = "top",
  contactId = "contact",
}: UseFloatingAssistantOptions = {}) {
  const [visible, setVisible] = useState(true);
  const [nearContact, setNearContact] =
    useState(false);
  const [footerVisible, setFooterVisible] =
    useState(false);
  const [invitationDismissed, setInvitationDismissed] =
    useState(false);

  const frameRef = useRef(0);

  useEffect(() => {
    const updatePosition = () => {
      frameRef.current = 0;

      /* Keep the compact assistant control globally available. */
      setVisible(true);

      const contact = document.getElementById(contactId);
      if (contact) {
        const contactBounds = contact.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        setNearContact(
          contactBounds.top <= viewportHeight * 0.78 &&
          contactBounds.bottom >= viewportHeight * 0.18
        );
      } else {
        setNearContact(false);
      }

      /* Track only the real portfolio footer, never section-level footer tags. */
      const footer = document.getElementById("portfolio-footer");
      if (footer) {
        const footerBounds = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isFooterVisible =
          footerBounds.top <= viewportHeight * 0.88 &&
          footerBounds.bottom >= viewportHeight * 0.12;

        setFooterVisible(isFooterVisible);
      } else {
        setFooterVisible(false);
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== 0) return;
      frameRef.current = window.requestAnimationFrame(updatePosition);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [contactId, heroId]);

  const dismissInvitation = useCallback(() => {
    setInvitationDismissed(true);
  }, []);

  return {
    visible,
    nearContact,
    invitationVisible:
      visible &&
      footerVisible &&
      !invitationDismissed,
    dismissInvitation,
  };
}
