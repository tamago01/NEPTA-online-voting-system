"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";

import { createContext, useContext } from "react";

interface TimerContextType {
  isTimerActive: boolean;
  timerValue: number;
  startTimer: () => void;
}

const TimerContext = createContext<TimerContextType>({
  isTimerActive: false,
  timerValue: 1800,
  startTimer: () => {},
});

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerValue, setTimerValue] = useState(1800);
  const [showBackdrop, setShowBackdrop] = useState(true);

  const startTimer = () => {
    setIsTimerActive(true);
    setShowBackdrop(true);
  };

  useEffect(() => {
    let timerInterval: any;

    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTimerValue((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timerInterval);
      setShowBackdrop(false);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerActive]);

  return (
    <TimerContext.Provider value={{ isTimerActive, timerValue, startTimer }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-100  relative`}>
        <TimerProvider>{children}</TimerProvider>
      </body>
    </html>
  );
}
