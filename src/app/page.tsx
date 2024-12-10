"use client";

import { useState, useEffect } from "react";
import { BackgroundBoxesDemo } from "@/components/background";
import SkillsSection from "@/components/skills";
import GlassDock from "@/components/dockdemo";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
useEffect(() => {
  setIsClient(true); // Set client flag after mount
}, []);

if (!isClient) {
  return null; // Prevent rendering on the server-side
}
  return (
    <main>
      <BackgroundBoxesDemo/>
      <SkillsSection/>
      <GlassDock />
    </main>
  );
}



// styiky scroll for projetcs