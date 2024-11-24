"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clipboard } from "lucide-react";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void; // Add click handler prop
}

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
  onClick,
}: TextRevealCardProps) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } = cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event: React.MouseEvent) {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]?.clientX ?? 0; // Use optional chaining for safety
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      onClick={onClick} // Add onClick event to trigger the handler
      className={cn(
        "bg-[#1d1c20]/50 border border-white/[0.08] w-[15rem] rounded-lg p-4 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-10 relative flex items-center overflow-hidden justify-evenly">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-[#1d1c20]/50 z-20 will-change-transform"
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-base sm:text-4xl py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
          >
            {revealText} {/* Displaying the revealText when the mouse is over */}
          </p>
        </motion.div>

        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-[4rem] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
        ></motion.div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="text-base sm:text-4xl py-10 font-bold bg-clip-text text-transparent bg-[#323238] mr-6">
            {text} {/* Displaying the main text beneath the revealText */}
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4">
        <Clipboard className="text-white" />
      </div>
    </div>
  );
};
