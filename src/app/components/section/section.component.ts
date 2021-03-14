import './section.component.scss';
import {IconComponent} from "../item/icon.component";
import { Section} from "../../models/config.interface";

export class SectionComponent extends HTMLElement {
    render() {
        this.innerHTML = '';
        this.style.backgroundColor = this.section.backgroundColor || 'none';
        this.style.gridTemplateColumns = `repeat(${this.columns}, min-content)`
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

    constructor(section: Section) {
        super();
        this.section = section;
    }
}
customElements.define('dashboard-section', SectionComponent);
