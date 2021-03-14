import {Item} from "../models/config.interface";

export class MappedItem {
    constructor(public readonly item: Item, public readonly parent: Item, public readonly level: number) {}
}

export enum ACTIONS {
    moveForward,
    moveBackward
}

export class MoveForwardAction {
    public readonly type = ACTIONS.moveForward;

    constructor(public readonly toItem: Item) {}
}

export type Actions = MoveForwardAction;

export class DashboardState {

    public action(action: Actions) {
        switch (action.type) {
            case ACTIONS.moveForward:{
                this.item = action.toItem;
            }
        }

    }

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

    public mapItems(item: Item, parent: Item, level: number) {
        this.mappedItems.set(item, new MappedItem(item, parent, level));

        if (item.sections && item.sections.length > 0) {
            item.sections.forEach(section => {
                if (section.items && section.items.length > 0) {
                    section.items.forEach(i => this.mapItems(i, item, level + 1));
                }
            })
        }
    }
}

export const AppState = new DashboardState();