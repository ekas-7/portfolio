"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['TECH', 'Web-Dev', 'DSA', 'Dev-Ops', 'Web 3.0']

const useTypingEffect = (text: string, duration: number) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    setDisplayedText('')
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, duration / text.length)

    return () => clearInterval(typingInterval)
  }, [text, duration])

  return displayedText
}

export default function BlurRotate() {
  const [index, setIndex] = useState(0)
  const currentWord = words[index]
  const displayedText = useTypingEffect(currentWord, 2000) // Increased typing duration

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 4000) // Increased word duration

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          initial={{ 
            opacity: 0, 
            filter: 'blur(15px)',
            y: 20 
          }}
          animate={{ 
            opacity: 1, 
            filter: 'blur(0px)',
            y: 0 
          }}
          exit={{ 
            opacity: 0, 
            filter: 'blur(15px)',
            y: -20 
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut",
            opacity: { duration: 0.6 },
            filter: { duration: 0.8 }
          }}
          className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent drop-shadow-sm"
        >
          {displayedText}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}