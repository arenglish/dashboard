import './section.component.scss';
import {ItemComponent} from "../item/item.component";
import {Section} from "../../models/config.interface";

export class SectionComponent extends HTMLElement {
    private readonly items: Set<any> = new Set();

    static get observedAttributes() {
        return ['columns'];
    }

    private setColumnsStyle() {
        this.style.gridAutoColumns
    }

    render() {
        this.innerHTML = '';
        this.style.backgroundColor = this.section.backgroundColor || 'none';
        this.style.gridTemplateColumns = `repeat(${this.columns}, min-content)`
        this._section.items.forEach((item: any, index: number) => {
            const image: ItemComponent = new ItemComponent(item);
            this.appendChild(image);
        });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case 'columns':
                this.render();
                break;
        }
    }

    private _section: Section;

    public get section(): Section {
        return this._section;
    }

    public set section(section: Section) {
        this._section = section;
        this.render();
    }

    get columns() {
        return parseInt(this.getAttribute('columns'), 10);
    }
    set columns(count: number) {
        this.setAttribute('columns', count.toString());
    }

    constructor(section: Section) {
        super();

        this.section = section;
        this.columns = Math.ceil(Math.sqrt(section.items.length));
    }
}
customElements.define('dashboard-section', SectionComponent);
