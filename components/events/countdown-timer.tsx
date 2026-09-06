"use client";

import { useEffect, useRef, useState } from "react";

type CountdownProps = {
  /** The target ISO date string to count down to */
  targetDate: string;
  /** Translated labels for the timer units */
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Calculates the remaining days, hours, minutes, and seconds until the target timestamp.
 * Returns zeros if the target has already passed.
 */
function calculateTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * A countdown timer component that displays the time remaining until a target date.
 * If the target date has passed, it shows a pulsing "LIVE" indicator badge.
 */
export function CountdownTimer({ targetDate, labels }: CountdownProps) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(target),
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [target]);

  const isLive =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isLive) {
    return (
      <div className="flex animate-pulse items-center justify-center gap-2 rounded-sm border border-red-500/40 bg-red-950/20 px-6 py-3 font-mono text-xl font-bold tracking-widest text-red-500 shadow-[0_0_20px_-3px_rgba(239,68,68,0.4)]">
        <span className="h-3.5 w-3.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        LIVE
      </div>
    );
  }

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: labels.days },
    { value: timeLeft.hours, label: labels.hours },
    { value: timeLeft.minutes, label: labels.minutes },
    { value: timeLeft.seconds, label: labels.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="min-w-[70px] rounded-sm border border-emerald-500/30 bg-emerald-950/20 px-3 py-4 text-center shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] sm:min-w-[90px]"
        >
          <div className="font-mono text-5xl font-bold tracking-tight text-emerald-400 tabular-nums drop-shadow-[0_0_10px_rgba(52,211,153,0.6)] sm:text-6xl">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="mt-2 font-mono text-[10px] font-semibold tracking-widest text-emerald-500 uppercase sm:text-xs">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
