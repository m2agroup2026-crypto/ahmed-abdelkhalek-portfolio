"use client";

import { useEffect, useState } from "react";

interface MobileViewportExperienceProps {
  children: React.ReactNode;
}

export default function MobileViewportExperience({ children }: MobileViewportExperienceProps) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div data-mobile-experience={mobile ? "true" : "false"}>
      {children}
    </div>
  );
}
