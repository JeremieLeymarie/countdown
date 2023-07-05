"use client";

import { WORKING_DAYS, WORK_DURATION_HOURS } from "@/constants";
import { useEffect, useState } from "react";

const getRemainingTime = () => {
  const today = new Date();
  const remainingDays = WORKING_DAYS.filter((date) => today < date);
  const isTodayAWorkingDay = !!WORKING_DAYS.find(
    (date) => today.toDateString() === date.toDateString()
  );
  let remainingSeconds = remainingDays.length * WORK_DURATION_HOURS * 60 * 60;
  const endOfDay = new Date();
  endOfDay.setHours(17);
  endOfDay.setMinutes(30);
  const startOfDay = new Date();
  startOfDay.setHours(9);
  startOfDay.setMinutes(30);
  if (isTodayAWorkingDay && today <= endOfDay && today >= startOfDay) {
    const timeRemainingToday = (endOfDay.getTime() - today.getTime()) / 1000;
    remainingSeconds += timeRemainingToday;
  }

  return remainingSeconds;
};

const secondsToReadableTime = (sec: number) => {
  const days = Math.floor(sec / (3600 * WORK_DURATION_HOURS));
  const hours = Math.floor((sec % (3600 * WORK_DURATION_HOURS)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);

  return { days, hours, minutes, seconds };
};

export default function Home() {
  const remainingSeconds = getRemainingTime();
  const [countDown, setCountDown] = useState(remainingSeconds);
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (!interval) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setInterval(() => {
        setCountDown(getRemainingTime());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);
  const { days, hours, minutes, seconds } = secondsToReadableTime(countDown);
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        {days} days, {hours} hours, {minutes} minutes
      </div>
      <div>Courage ma xo ♥️</div>
    </div>
  );
}
