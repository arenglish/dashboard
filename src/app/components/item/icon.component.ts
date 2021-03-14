import './icon.component.scss';
import {Item} from "../../models/config.interface";
import {AppState} from "../../services/state.service";

export class IconComponent extends HTMLElement {
    render() {
        this.innerHTML = '';
        const image = document.createElement('img')
        image.src = 'assets/' + this._item.icon;
        image.style.height = '100%';
        image.style.height = '100%';
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

    constructor(item: Item) {
        super();

        this.item = item;

        this.onclick = () => {
            if (this.item.sections && this.item.sections.length > 0) {
                AppState.item = this.item;
            }
        }
    }
}
customElements.define('dashboard-icon', IconComponent);
