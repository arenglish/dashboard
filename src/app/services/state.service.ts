import {Page} from "../models/config.interface";


export class DashboardState {
    private _page: Page;
    public get page(): Page {
        return this._page;
    }

    public set page(page: Page) {
        this._previousPage = this._page;
        this._page = page;
        this.onChange(this);
    }

    private _previousPage: Page;
    public get previousPage(): Page {
        return this._previousPage
    }

    private onChange: (state: DashboardState) => void;

    public registerOnChange(fn: (state: DashboardState) => void) {
        this.onChange = fn;
    }
}

export const AppState = new DashboardState();