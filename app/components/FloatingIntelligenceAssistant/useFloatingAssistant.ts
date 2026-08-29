"use client";

import {
  useCallback,
  useEffect,
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
  const [visible] = useState(true);
  const [nearContact, setNearContact] =
    useState(false);
  const [footerVisible, setFooterVisible] =
    useState(false);
  const [invitationDismissed, setInvitationDismissed] =
    useState(false);

  useEffect(() => {
    const contact = document.getElementById(contactId);
    const footer = document.getElementById("portfolio-footer");

    let contactObserver: IntersectionObserver | null = null;
    let footerObserver: IntersectionObserver | null = null;

    if (contact) {
      contactObserver = new IntersectionObserver(
        ([entry]) => {
          setNearContact(Boolean(entry?.isIntersecting));
        },
        {
          threshold: 0.01,
          rootMargin: "-18% 0px -18% 0px",
        },
      );

      contactObserver.observe(contact);
    } else {
      setNearContact(false);
    }

    if (footer) {
      footerObserver = new IntersectionObserver(
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
    } else {
      setFooterVisible(false);
    }

    return () => {
      contactObserver?.disconnect();
      footerObserver?.disconnect();
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
