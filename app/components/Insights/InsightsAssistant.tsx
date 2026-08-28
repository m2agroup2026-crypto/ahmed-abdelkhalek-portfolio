"use client";

import { useState } from "react";
import FloatingIntelligenceAssistant from "../FloatingIntelligenceAssistant/FloatingIntelligenceAssistant";
import IntelligenceModal from "../IntelligenceExperience/IntelligenceModal";
import type { InsightLanguage } from "../../content/insights/types";

export default function InsightsAssistant({
  language,
}: {
  language: InsightLanguage;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingIntelligenceAssistant
        language={language}
        open={open}
        onOpen={() => setOpen(true)}
      />
      <IntelligenceModal
        open={open}
        language={language}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
