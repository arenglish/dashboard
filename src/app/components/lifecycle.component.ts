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
  destroyChildren(el: ChildNode = this) {
    el.childNodes.forEach((node) => {
      if (node.hasChildNodes()) {
        this.destroyChildren(node);
      } else if ((node as any).destroy) {
        (node as any).destroy();
      }
    });
  }
  destroy() {
    this.detatchListener();
    this.remove();
  }
}
