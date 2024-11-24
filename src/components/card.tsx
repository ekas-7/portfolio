"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export default function ProfileCard() {
  const [isFloating, setIsFloating] = useState(false)

  useEffect(() => {
    setIsFloating(true)
  }, [])

  return (
    <div className="flex justify-center md:justify-end p-4">
      <div 
        className={cn(
          "relative group",
          isFloating && "animate-float"
        )}
        style={{
          perspective: '1000px',
        }}
      >
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-indigo-400 rounded-full opacity-60 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden transform transition-transform duration-300 ease-out group-hover:scale-105">
          <CardDemo />
        </div>
      </div>
    </div>
  )
}

function CardDemo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="w-full h-full relative transform transition-transform duration-300 ease-out"
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered ? 'rotateY(-10deg) rotateX(10deg)' : 'rotateY(0) rotateX(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static image */}
      <div
        className={cn(
          "w-full h-full absolute top-0 left-0",
          "bg-[url('/pic.jpg')] bg-cover bg-center",
          "transition-opacity duration-1000 ease-in-out",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      />
      {/* GIF image */}
      <div
        className={cn(
          "w-full h-full absolute top-0 left-0",
          "bg-[url('/giphy-1.webp')] bg-cover bg-center",
          "transition-opacity duration-1000 ease-in-out",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}

