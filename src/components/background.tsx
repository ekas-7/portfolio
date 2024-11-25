import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileCard from "./card";
import WordRotate from "./ui/word-rotate";
import TextRevealCard from "./ui/text-reveal-card";
import BlurRotate from "./ui/blur-rotate";
import { Boxes } from "./ui/background-boxes";
import "./styles/floating-animations.css";

export function BackgroundBoxesDemo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-screen w-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Background elements */}
      <Boxes className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-indigo-500/10 z-10 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 md:gap-16 lg:gap-24">
          {/* Left column - Text content */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="flex flex-col">
              <h2 className="flex items-center gap-3 text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 font-bold tracking-wide mb-2 md:mb-4">
                <Terminal 
                  className="text-emerald-400 animate-pulse" 
                  size={24} 
                />
                <WordRotate
                  className="text-xl font-bold text-white"
                  words={["HI MY NAME IS", "CHKA CHKA","NAH I'D WIN"]}
                />
              </h2>
              <h1 className={cn(
                "text-4xl md:text-6xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400 font-extrabold tracking-tight hover:scale-105 transition-transform duration-300"
              )}>
                Ekas Atwal
              </h1>
            </div>
            
            <div className="text-xl md:text-2xl lg:text-3xl text-gray-200 tracking-wide pb-4 flex items-center gap-2 hover:text-gray-100 transition-colors duration-300">
              <span>Just chilling in</span>
              <BlurRotate />
            </div>

            {/* Text reveal card section */}
            <div className="w-full sm:w-64 transition-all duration-300 ease-in-out hover:scale-105">
              <div className="float">
                <TextRevealCard 
                  className="w-full backdrop-blur-sm bg-white/5" 
                />
              </div>
            </div>
          </div>

          {/* Right column - Profile card */}
          <div className="float transition-transform duration-500 hover:scale-105">
            <ProfileCard />
          </div>
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 w-full h-full bg-slate-950/50 z-30 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
    </div>
  );
}

export default BackgroundBoxesDemo;