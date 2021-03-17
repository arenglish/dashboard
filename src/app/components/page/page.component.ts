import { Item } from "../../models/config.interface";
import { SectionComponent } from "../section/section.component";
import "./page.component.scss";
import { GoBackComponent } from "../go-back/go-back.component";
import { LifeCycleComponent } from "../lifecycle.component";
import { AppState, Changes } from "../../services/state.service";

export class PageComponent extends LifeCycleComponent {
  onChange(changes: Changes) {
    this.render(changes);
  }

  render(changes: Changes = null) {
    this.destroyChildren();
    const gridParent = document.createElement("div");
    gridParent.id = "grid-container";
    const grid = document.createElement("div");
    grid.id = "grid";
    this.item.sections.forEach((section) => {
      const el = new SectionComponent(section);
      grid.appendChild(el);
    });

    gridParent.appendChild(grid);
    this.appendChild(gridParent);
    if (!!this.state.mappedItems.get(this.item).parent) {
      const goBack = new GoBackComponent();
      goBack.style.position = 'absolute';
      goBack.style.right = '64px';
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

  private largestCollectionSize() {
    return this.item.sections.reduce((largest, section) => {
      if (!largest || !largest.items) {
        return section;
      }
      if (!section || !section.items) {
        return largest;
      }

      return largest.items.length > section.items.length ? largest : section;
    }, null);
  }

  private totalChildItems() {
    return this.item.sections.reduce((total, section) => {
      const count = section && section.items ? section.items.length : 0;
      total = total + count;
      return total;
    }, 0);
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
