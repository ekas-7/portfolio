"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Clipboard, Check } from "lucide-react";

interface TextRevealCardProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

const TextRevealCard = ({
  text = "npx ekas",
  className,
  onClick,
}: TextRevealCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent onClick
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "group bg-[#1d1c20]/50 hover:bg-[#1d1c20]/70 border border-white/[0.08]",
        "hover:border-white/[0.12] w-full max-w-[15rem] rounded-lg p-4",
        "relative flex items-center justify-between",
        "transition-all duration-300 ease-in-out",
        "cursor-pointer select-none",
        className
      )}
    >
      <p className="text-base sm:text-3xl font-bold text-white/90 group-hover:text-white">
        {text}
      </p>

      <button
        onClick={handleCopy}
        className={cn(
          "p-2 rounded-md",
          "transition-all duration-300",
          "hover:bg-white/[0.05]",
          "active:scale-95"
        )}
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="text-green-400 w-5 h-5" />
        ) : (
          <Clipboard className="text-white/80 w-5 h-5 group-hover:text-white" />
        )}
      </button>
    </div>
  );
};

export default TextRevealCard;