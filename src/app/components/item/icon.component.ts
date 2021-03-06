import { Item } from "../../models/config.interface";
import {
  AppState,
  DashboardState,
  MoveForwardAction,
} from "../../services/state.service";
import { LifeCycleComponent } from "../lifecycle.component";
const css = require("./icon.component.scss");
console.log(css);

export class IconComponent extends LifeCycleComponent {
  onChange() {
    this.render();
  }
  render() {
    this.innerHTML = "";
    const image = document.createElement("img");
    image.src = "assets/" + this._item.icon;
    if (this.item.backgroundColor) {
      this.style.background = this.item.backgroundColor;
    }
    this.appendChild(image);
  }

  private _item: Item;
  public get item(): Item {
    return this._item;
  }

  public set item(item: Item) {
    this._item = item;
    this.render();
  }

  constructor(state: DashboardState, item: Item) {
    super(state);

    this.item = item;

    if (this._item.link) {
      this.onclick = () => {
        window.location.href = this._item.link;
      };
    } else {
      this.onclick = () => {
        if (this.item.sections && this.item.sections.length > 0) {
          AppState.action(new MoveForwardAction(this.item));
        }
      };
    }
  }
}
customElements.define("dashboard-icon", IconComponent);
