"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

interface TimerContextType {
  isTimerActive: boolean;
  timerValue: number;
  startTimer: () => void;
  showBackdrop: boolean;
}

const TimerContext = createContext<TimerContextType>({
  isTimerActive: false,
  timerValue: 10,
  startTimer: () => {},
  showBackdrop: true,
});

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerValue, setTimerValue] = useState(10);
  const [showBackdrop, setShowBackdrop] = useState(true);

  const startTimer = () => {
    setIsTimerActive(true);
    setShowBackdrop(true);
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTimerValue((prevValue) => {
          const newValue = prevValue > 0 ? prevValue - 1 : 0;
          if (newValue === 0) {
            clearInterval(timerInterval);
            setIsTimerActive(false);
            setShowBackdrop(false);
          }

          return newValue;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isTimerActive]);

  return (
    <TimerContext.Provider
      value={{ isTimerActive, timerValue, startTimer, showBackdrop }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
