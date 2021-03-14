import {Item} from "../../models/config.interface";
import {SectionComponent} from "../section/section.component";
import './page.component.scss';

export class PageComponent extends HTMLElement {
    render() {
        this.innerHTML = '';
        this.style.gridTemplateColumns = `repeat(${this.columns}, min-content)`
        if (this.item.sections && this.item.sections.length > 0) {
            this.item.sections.forEach(item => {
                this.appendChild(new SectionComponent(item));
            })
        }
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

    constructor(item: Item) {
        super();

        this.item = item;
    }
}
customElements.define('dashboard-page', PageComponent);
