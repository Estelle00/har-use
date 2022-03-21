import { computed, onActivated, ref } from "vue-demi";
import { onDeactivated } from "vue";

export type CurrentTime = {
  days: number;
  hours: number;
  total: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};
export type UseCountDownOptions = {
  time: number;
  millisecond?: boolean;
  onChange?: (current: any) => void;
  onFinish?: () => void;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
function parseTime(time: number): CurrentTime {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}
function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
export function useCountDown(options: UseCountDownOptions) {
  const remain = ref(options.time);
  const current = computed(() => parseTime(remain.value));
  let endTime: number;
  let counting: boolean;
  let rafId: number;

  function pause() {
    counting = false;
    cancelAnimationFrame(rafId);
  }
  function getCurrentRemain() {
    return Math.max(endTime - Date.now(), 0);
  }
  function setRemain(value: number) {
    remain.value = value;
    options.onChange?.(current.value);
    if (value === 0) {
      pause();
      // 暂停
      options.onFinish?.();
    }
  }
  function tick() {
    rafId = requestAnimationFrame(function () {
      if (counting) {
        const remainRemain = getCurrentRemain();
        if (
          options.millisecond ||
          !isSameSecond(remainRemain, remain.value) ||
          remainRemain === 0
        ) {
          setRemain(getCurrentRemain());
        }
        if (remain.value > 0) {
          tick();
        }
      }
    });
  }
  function start() {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  }
  function reset(totalTime: number = options.time) {
    pause();
    remain.value = totalTime;
  }
  let deactivated: boolean;
  onActivated(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });
  onDeactivated(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });
  return {
    start,
    pause,
    reset,
    current,
  } as const;
}
