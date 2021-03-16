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
    this.innerHTML = "";
    this.style.backgroundColor = this.section.backgroundColor || "none";
    this.style.gridTemplateColumns = `repeat(2, min-content)`;
    this.style.gridRow = `span ${this.rows * 2}`;
    this.style.gridColumn = `span ${this.columns * 2}`;
    this._section.items.forEach((item: any) => {
      this.appendChild(new IconComponent(item));
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
    return Math.ceil(this.section.items.length / this.columns);
  }

  constructor(section: Section) {
    super(AppState);
    this.section = section;
  }
}
customElements.define("dashboard-section", SectionComponent);
