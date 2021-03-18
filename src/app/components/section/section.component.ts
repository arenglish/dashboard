import "./section.component.scss";
import { IconComponent } from "../item/icon.component";
import { Section } from "../../models/config.interface";
import { LifeCycleComponent } from "../lifecycle.component";
import { AppState } from "../../services/state.service";

export class SectionComponent extends LifeCycleComponent {
  onChange() {
    this.render();
  }
  render() {
    this.destroyChildren();
    this.style.backgroundColor = this.section.backgroundColor || "none";
    this.style.gridTemplateColumns = `repeat(2, 74px)`;
    this.style.gridColumnStart = `span 1`;
    this.style.gridRowStart = `span ${this.rows}`;
    this._section.items.forEach((item: any) => {
      this.appendChild(new IconComponent(AppState, item));
    });
  }

  private _section: Section;

  public get section(): Section {
    return this._section;
  }

  public set section(section: Section) {
    this._section = section;
    this.render();
  }

  private get columns(): number {
    return Math.ceil(Math.sqrt(this.section.items.length));
  }

  private get rows(): number {
    return Math.ceil(this.section.items.length / 2);
  }

  constructor(section: Section) {
    super(AppState);
    this.section = section;
  }
}
customElements.define("dashboard-section", SectionComponent);
