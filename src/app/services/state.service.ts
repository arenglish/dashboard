import { Item } from "../models/config.interface";

export class MappedItem {
  constructor(
    public readonly item: Item,
    public readonly parent: Item,
    public readonly level: number
  ) {}
}

export enum ACTIONS {
  moveForward,
  moveBackward,
  enterEditMode,
  leaveEditMode,
  toggleEditMode,
}

export class MoveForwardAction {
  public readonly type = ACTIONS.moveForward;

  constructor(public readonly toItem: Item) {}
}

export class MoveBackwardAction {
  public readonly type = ACTIONS.moveBackward;
}

export class EnterEditModeAction {
  public readonly type = ACTIONS.enterEditMode;
}

export class LeaveEditModeAction {
  public readonly type = ACTIONS.leaveEditMode;
}

export class ToggleEditMode {
  public readonly type = ACTIONS.toggleEditMode;
}

export type Actions =
  | MoveForwardAction
  | MoveBackwardAction
  | EnterEditModeAction
  | LeaveEditModeAction
  | ToggleEditMode;

export interface State {
  item: Item;
  previousItem: Item;
  editMode: boolean;
}

export class Change<T> {
  constructor(public readonly previous: T, public readonly current: T) {}
}

export type Changes = { [K in keyof State]?: Change<State[K]> };

export class DashboardState {
  public listeners: Map<any, (changes: Changes) => void> = new Map<
    any,
    (changes: Changes) => void
  >();

  private _editMode: boolean = false;
  public get editMode(): boolean {
    return this._editMode;
  }

  public action(action: Actions) {
    const changes: Changes = {};
    switch (action.type) {
      case ACTIONS.moveForward: {
        changes.previousItem = new Change(this._previousItem, this._item);
        changes.item = new Change(this._item, action.toItem);
        break;
      }
      case ACTIONS.moveBackward: {
        changes.previousItem = new Change(this._previousItem, this._item);
        changes.item = new Change(
          this._item,
          this.mappedItems.get(this.item).parent
        );
        break;
      }
      case ACTIONS.enterEditMode: {
        changes.editMode = new Change(this.editMode, true);
        break;
      }
      case ACTIONS.leaveEditMode: {
        changes.editMode = new Change(this.editMode, false);
        break;
      }
      case ACTIONS.toggleEditMode: {
        changes.editMode = new Change(this.editMode, !this.editMode);
        break;
      }
    }

    Object.keys(changes).forEach((key: string) => {
      (this as any)[`_${key}`] = (changes as any)[key].current;
    });

    this.onChange(changes);
  }

  private _item: Item = null;
  public get item() {
    return this._item;
  }

  private onChange(changes: Changes) {
    this.listeners.forEach((cb) => {
      cb(changes);
    });
  }

  private _previousItem: Item = null;
  public get previousItem(): Item {
    return this._previousItem;
  }

  public readonly mappedItems: Map<Item, MappedItem> = new Map<
    Item,
    MappedItem
  >();

  public mapItems(item: Item, parent: Item, level: number) {
    this.mappedItems.set(item, new MappedItem(item, parent, level));

    if (item.sections && item.sections.length > 0) {
      item.sections.forEach((section) => {
        if (section.items && section.items.length > 0) {
          section.items.forEach((i) => this.mapItems(i, item, level + 1));
        }
      });
    }
  }
}

export const AppState = new DashboardState();
