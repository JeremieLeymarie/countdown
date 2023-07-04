"use client";

import { WORKING_DAYS, WORK_DURATION_HOURS } from "@/constants";
import { useEffect, useState } from "react";

const getRemainingTime = () => {
  const today = new Date();
  const remainingDays = WORKING_DAYS.filter((date) => today < date);
  const isTodayAWorkingDay = WORKING_DAYS.find(
    (date) => today.getTime() === date.getTime()
  );

  let remainingSeconds = remainingDays.length * WORK_DURATION_HOURS * 60 * 60;
  const endOfDay = new Date();
  endOfDay.setHours(17);
  endOfDay.setMinutes(30);
  if (isTodayAWorkingDay && today < endOfDay) {
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

  const dDisplay = days > 0 ? days + (days == 1 ? " day, " : " days, ") : "";
  const hDisplay =
    hours > 0 ? hours + (hours == 1 ? " hour, " : " hours, ") : "";
  const mDisplay =
    minutes > 0 ? minutes + (minutes == 1 ? " minute, " : " minutes, ") : "";
  const sDisplay =
    seconds > 0 ? seconds + (seconds == 1 ? " second" : " seconds") : "";

  return `${dDisplay} ${hDisplay} ${mDisplay} ${sDisplay}`;
};

export default function Home() {
  const remainingSeconds = getRemainingTime();
  const [countDown, setCountDown] = useState(remainingSeconds);
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (!interval) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);
  return <div>{countDown}</div>;
}
