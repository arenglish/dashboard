import { Changes, DashboardState } from "../services/state.service";

let count = 0;
export class LifeCycleComponent extends HTMLElement {
  public index = count++;
  public onChange(changes: Changes) {}
  public detatchListener() {
    this.state.listeners.delete(this.index);
  }
  constructor(public state: DashboardState) {
    super();

    state.listeners.set(this.index, (changes: Changes) =>
      this.onChange(changes)
    );
  }
  destroyChildren(el: HTMLElement = this) {
    [...el.children].forEach((child: HTMLElement) => {
      if (child.hasChildNodes()) {
        this.destroyChildren(child);
      }
      if ((child as any).destroy) {
        (child as any).destroy();
      } else {
        child.remove();
      }
    });
  }
  destroy() {
    this.detatchListener();
    this.remove();
  }
}
