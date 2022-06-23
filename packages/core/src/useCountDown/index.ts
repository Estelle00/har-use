import { computed, onActivated, ref } from "vue";
import { onDeactivated } from "vue";
import { cancelRaf, raf } from "@har-use/utils";

export type CurrentTime = {
  days: number;
  hours: number;
  total: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type UseCountDownOptions = {
  // 倒计时时长，单位毫秒
  time: number;
  // 是否开启毫秒级渲染
  millisecond?: boolean;
  // 倒计时改变时触发的回调函数
  onChange?: (current: CurrentTime) => void;
  // 倒计时结束时触发的回调函数
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
  // 当前剩余的时间
  const current = computed(() => parseTime(remain.value));
  let endTime: number;
  let counting: boolean;
  let rafId: number;

  // 暂停倒计时
  function pause() {
    counting = false;
    cancelRaf(rafId);
  }
  function getCurrentRemain() {
    return Math.max(endTime - Date.now(), 0);
  }
  function setRemain(value: number) {
    remain.value = value;
    options.onChange?.(current.value);
    if (value === 0) {
      reset(options.time);
      // 暂停
      options.onFinish?.();
    }
  }
  function tick() {
    rafId = raf(function () {
      if (counting) {
        const remainRemain = getCurrentRemain();
        if (
          options.millisecond ||
          !isSameSecond(remainRemain, remain.value) ||
          remainRemain === 0
        ) {
          setRemain(remainRemain);
        }
        if (remain.value > 0) {
          tick();
        }
      }
    });
  }
  // 	开始倒计时
  function start() {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  }
  // 	重置倒计时，支持传入新的倒计时时长
  function reset(totalTime = options.time) {
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
