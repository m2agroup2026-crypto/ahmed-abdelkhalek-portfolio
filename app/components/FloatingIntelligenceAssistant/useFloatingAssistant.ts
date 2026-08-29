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
  const [invitationUnlocked, setInvitationUnlocked] =
    useState(false);
  const [invitationDismissed, setInvitationDismissed] =
    useState(false);

  const frameRef = useRef(0);

  useEffect(() => {
    const footer = document.querySelector("footer");

    const updatePosition = () => {
      frameRef.current = 0;

      /* Keep the compact assistant control globally available. */
      setVisible(true);

      const contact = document.getElementById(contactId);
      if (contact) {
        const contactBounds =
          contact.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        setNearContact(
          contactBounds.top <= viewportHeight * 0.78 &&
          contactBounds.bottom >= viewportHeight * 0.18
        );
      } else {
        setNearContact(false);
      }

      /*
       * The larger invitation belongs to the closing experience only.
       * Unlock it once the footer actually enters the viewport instead
       * of showing it after a timer near the top of the page.
       */
      if (footer) {
        const footerBounds = footer.getBoundingClientRect();
        const footerIsVisible =
          footerBounds.top <= window.innerHeight * 0.94 &&
          footerBounds.bottom >= 0;

        if (footerIsVisible) {
          setInvitationUnlocked(true);
        }
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== 0) {
        return;
      }

      frameRef.current =
        window.requestAnimationFrame(updatePosition);
    };

    requestUpdate();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate,
      { passive: true }
    );

    return () => {
      window.cancelAnimationFrame(frameRef.current);

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );
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
      invitationUnlocked &&
      !invitationDismissed,
    dismissInvitation,
  };
}
