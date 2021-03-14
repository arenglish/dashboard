import {Item} from "../models/config.interface";

export class MappedItem {
    constructor(public readonly item: Item, public readonly parent: Item) {}
}

export class DashboardState {
    private _item: Item;
    public get item(): Item {
        return this._item;
    }

    public set item(item: Item) {
        this._previousItem = this._item;
        this._item = item;
        this.onChange(this);
    }

    private _previousItem: Item;
    public get previousItem(): Item {
        return this._previousItem;
    }

    private onChange: (state: DashboardState) => void;

    public registerOnChange(fn: (state: DashboardState) => void) {
        this.onChange = fn;
    }

    public mappedItems: Map<Item, MappedItem> = new Map<Item, MappedItem>();

    public mapItems(item: Item, parent: Item) {
        this.mappedItems.set(item, new MappedItem(item, parent));

        if (item.sections && item.sections.length > 0) {
            item.sections.forEach(section => {
                if (section.items && section.items.length > 0) {
                    section.items.forEach(i => this.mapItems(i, item));
                }
            })
        }
    }
}

export const AppState = new DashboardState();