import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useInterval } from "./useInterval";

interface Countdown {
  isEnded: boolean;
  countdownString: string;
  countdownStringDays: string;
}

/** useCountdown should always be used within a component using useIsMounted() to avoid "content
 * does not match server-rendered HTML" errors. */
export const useCountdown = (
  endTime: number,
  onEnd: <T extends any[]>(...args: T) => void
): Countdown => {
  const [now, setNow] = useState(dayjs.unix(Date.now() / 1000));
  const [isRunning, setIsRunning] = useState(true);
  const [end, setEndTime] = useState(dayjs.unix(endTime));
  const [isRunningInterval, setIsRunningInterval] = useState<number | null>(
    1000
  );

  useEffect(() => {
    setEndTime(dayjs.unix(endTime));
  }, [endTime]);

  useEffect(() => {
    setIsRunningInterval(isRunning ? 1000 : null);
  }, [isRunning]);

  useInterval(() => {
    setNow(dayjs.unix(Date.now() / 1000));
  }, isRunningInterval);

  const countdown = end.diff(now, "second");

  useEffect(() => {
    if (now >= end) {
      onEnd();
    } else if (now < end && !isRunning) {
      setIsRunning(true);
    }
  }, [now, end, onEnd]);

  return {
    isEnded: now >= end,
    countdownString: `${Math.floor(countdown / 3600)}h ${Math.floor(
      (countdown % 3600) / 60
    )}m ${countdown % 60}s`,
    countdownStringDays:
      countdown > 172800
        ? `${Math.floor(countdown / 86400)} days`
        : `${Math.floor(countdown / 3600)
            .toString()
            .padStart(2, "0")}h ${Math.floor((countdown % 3600) / 60)
            .toString()
            .padStart(2, "0")}m ${(countdown % 60)
            .toString()
            .padStart(2, "0")}s`,
  };
};
