/* Credits:  https://stackoverflow.com/questions/48048957/react-long-press-event */
import { useCallback, useRef, useMemo } from "react";

export default function useLongPress({ onClick = () => {}, onLongPress = () => {}, ms = 300, fireInterval = 50 } = {}) {
  const timerRef = useRef(false);
  const eventRef = useRef({});
  const intervalRef = useRef();

  const callback = useCallback(() => {
    intervalRef.current = setInterval(() => {
      onLongPress(eventRef.current);
    }, fireInterval);
    console.log("callback");
    eventRef.current = {};
    timerRef.current = false;
  }, [onLongPress]);

  const start = useCallback(
    (ev) => {
      ev.persist();
      eventRef.current = ev;
      timerRef.current = setTimeout(callback, ms);
    },
    [callback, ms]
  );

  const stop = useCallback(
    (ev) => {
      ev.persist();
      eventRef.current = ev;
      clearInterval(intervalRef.current);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        clearInterval(intervalRef.current);
        onClick(eventRef.current);
        timerRef.current = false;
        eventRef.current = {};
      }
    },
    [onClick]
  );

  return useMemo(
    () => ({
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    }),
    [start, stop]
  );
}
