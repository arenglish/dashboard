import { Item } from "../../models/config.interface";
import { SectionComponent } from "../section/section.component";
import "./page.component.scss";
import { GoBackComponent } from "../go-back/go-back.component";
import { LifeCycleComponent } from "../lifecycle.component";
import {
  AppState,
  Changes,
  EnterEditModeAction,
  ToggleEditMode,
} from "../../services/state.service";

export class PageComponent extends LifeCycleComponent {
  onChange(changes: Changes) {
    this.render(changes);
  }

  render(changes: Changes = null) {
    this.innerHTML = `
            <div id="grid-container" style="display: grid"></div>
            <div id="back-container"></div>
        `;
    const edit = document.createElement("button");
    edit.innerHTML = "EDIT";
    edit.onclick = () => {
      this.state.action(new ToggleEditMode());
    };
    this.appendChild(edit);
    this.style.backgroundColor = this.state.editMode ? "indianred" : "white";
    const grid = document.createElement("div");
    grid.style.display = "grid";

    grid.style.gridTemplateColumns = `repeat(${this.columns * 4}, min-content)`;
    grid.style.gridGap = `15px`;
    if (this.item.sections && this.item.sections.length > 0) {
      this.item.sections.forEach((item) => {
        grid.appendChild(new SectionComponent(item));
      });
    }

    this.appendChild(grid);
    if (!!this.state.mappedItems.get(this.item).parent) {
      const goBack = new GoBackComponent();
      this.appendChild(goBack);
    }
  }

  public flyForwards() {
    this.style.transition =
      "transform 300ms ease-in-out, opacity 300ms ease-in-out";
    this.style.transform = "perspective(5px) translate3d(0px, 0px, 6px)";
    this.style.opacity = "0";
    setTimeout(() => {
      this.remove();
    }, 500);
  }

  public flyBackwards() {
    this.style.transition =
      "transform 300ms ease-in-out, opacity 300ms ease-in-out";
    this.style.transform = "perspective(5px) translate3d(0px, 0px, -50px)";
    this.style.opacity = "0";

    setTimeout(() => {
      this.remove();
    }, 500);
  }

  private _item: Item;
  public get item(): Item {
    return this._item;
  }

  public set item(item: Item) {
    this._item = item;
    this.render();
  }

  private get columns(): number {
    return Math.ceil(Math.sqrt(this.item.sections.length));
  }

  constructor(item: Item, flyInFrom?: "foreground" | "background") {
    super(AppState);

    this.item = item;

    if (flyInFrom) {
      this.style.transition =
        "transform 300ms ease-in-out, opacity 300ms ease-in-out";
      this.style.opacity = "0";

      if (flyInFrom === "foreground") {
        this.style.transform = "perspective(5px) translate3d(0px, 0px, 10px)";
        setTimeout(() => {
          this.style.transform = "perspective(5px) translate3d(0px, 0px, 0px)";
          this.style.opacity = "1";
        }, 0);
      } else {
        this.style.transform = "perspective(5px) translate3d(0px, 0px, -50px)";
        setTimeout(() => {
          this.style.transform = "perspective(5px) translate3d(0px, 0px, 0px)";
          this.style.opacity = "1";
        }, 0);
      }
    }
  }
}
customElements.define("dashboard-page", PageComponent);
