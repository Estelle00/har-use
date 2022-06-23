type Listener<T> = (p?: T) => void;
export type EventBusOff = () => void;

export class EventBus<T> {
  fns: Listener<T>[] = [];
  on(fn: Listener<T>): EventBusOff {
    this.fns.push(fn);
    return () => {
      const index = this.fns.indexOf(fn);
      if (index > -1) {
        this.fns.splice(index, 1);
      }
    };
  }
  trigger(param?: T): void {
    this.fns.forEach((fn) => fn(param));
  }
}
