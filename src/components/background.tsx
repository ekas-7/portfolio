"use client";

import { useState, useEffect } from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import ProfileCard from "./card";
import { Terminal } from "lucide-react";
import "./styles/animation.css";
import WordRotate from "./ui/word-rotate";
import { TextRevealCard } from "./ui/text-reveal-card";
import { ToastContainer, toast } from "react-toastify"; // Import Toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export function BackgroundBoxesDemo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ensure rendering only on the client side
  if (!isClient) return null;

  // Handler for copying text and showing toast notification
  const handleTextRevealClick = () => {
    const textToCopy = "npx ekas"; // Text to be copied to the clipboard

    // Copy text to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show toast notification
      toast.success("run it on terminal");
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy text!"); // Show error toast on failure
    });
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gray-950 flex items-center justify-center">
      {/* Background Boxes Component - Bottom layer */}
      <Boxes className="absolute inset-0" />

      {/* Background gradient effect - Middle layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-indigo-500/10 z-10 pointer-events-none" />

      {/* Content wrapper - Top layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-12 md:gap-20">
          {/* Text Content */}
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <h2 className="flex items-center space-x-3 text-xl md:text-xl lg:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 font-extrabold tracking-wide leading-snug mb-2">
                {/* Terminal Icon before text */}
                <Terminal className="text-emerald-400" size={24} />
                <span>
                  <WordRotate
                    className="text-xl font-bold text-black dark:text-white"
                    words={["HI MY NAME IS ", "CHKA CHKA"]}
                  />
                </span>
              </h2>
              <h1
                className={cn(
                  "text-4xl md:text-6xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400 font-extrabold tracking-tighter leading-tight"
                )}
              >
                Ekas Atwal
              </h1>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 tracking-wide">
              I am a{" "}
              <span className="text-emerald-400 font-semibold">Developer</span>
            </p>
            
            {/* Smaller TextRevealCard */}
            <div className="w-1/2 sm:w-1/3"> {/* Adjust width here */}
              <TextRevealCard
                text="R ekas cli"
                revealText="npx ekas"
                onClick={handleTextRevealClick} // Add onClick handler here
              />
            </div>
          </div>

          {/* Profile Picture */}
          <ProfileCard />
        </div>
      </div>

      {/* Radial gradient overlay - Topmost layer */}
      <div className="absolute inset-0 w-full h-full bg-gray-950/50 z-30 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      
      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={3000} className="z-50" />
    </div>
  );
}
