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
  const [visible, setVisible] = useState(false);
  const [nearContact, setNearContact] =
    useState(false);
  const [invitationDismissed, setInvitationDismissed] =
    useState(false);

  const frameRef = useRef(0);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const contact = document.getElementById(contactId);

    const updatePosition = () => {
      frameRef.current = 0;

      if (hero) {
        const heroBounds =
          hero.getBoundingClientRect();

        setVisible(heroBounds.bottom <= 120);
      } else {
        setVisible(true);
      }

      if (contact) {
        const contactBounds =
          contact.getBoundingClientRect();

        const viewportHeight =
          window.innerHeight;

        const contactIsNear =
          contactBounds.top <= viewportHeight * 0.78 &&
          contactBounds.bottom >= viewportHeight * 0.18;

        setNearContact(contactIsNear);
      } else {
        setNearContact(false);
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
      nearContact &&
      !invitationDismissed,
    dismissInvitation,
  };
}
