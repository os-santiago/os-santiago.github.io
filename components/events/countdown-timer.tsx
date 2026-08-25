"use client";

import { useEffect, useRef, useState } from "react";

type CountdownProps = {
  targetDate: string;
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

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: labels.days },
    { value: timeLeft.hours, label: labels.hours },
    { value: timeLeft.minutes, label: labels.minutes },
    { value: timeLeft.seconds, label: labels.seconds },
  ];

  return (
    <div className="flex gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="text-cyan font-mono text-3xl font-bold tabular-nums sm:text-4xl">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="text-cyan-deep font-mono text-[10px] tracking-widest uppercase">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
