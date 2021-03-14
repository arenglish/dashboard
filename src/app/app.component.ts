import * as CONFIG from "../dashboard.config.json";
import {AppState, DashboardState} from "./services/state.service";
import './app.component.scss';
import {GoBackComponent} from "./components/go-back/go-back.component";
import {PageComponent} from "./components/page/page.component";

export class DashboardApp extends HTMLElement {
    connectedCallback() {
        AppState.mapItems(CONFIG, null, 0)
        AppState.registerOnChange((...args) => {
            this.renderPage(...args);
        });
        AppState.item = CONFIG;
    }

    private page: PageComponent;

    private renderPage(state: DashboardState) {
        const forward = AppState.previousItem && AppState.mappedItems.get(AppState.item).level > AppState.mappedItems.get(AppState.previousItem).level;

        const oldPage = this.page;

        if (oldPage) {
            if (forward) {
                this.page = new PageComponent(state.item, 'background');
                oldPage.flyForwards();
            } else {
                this.page = new PageComponent(state.item, 'foreground');
                oldPage.flyBackwards();
            }
        } else {
            this.page = new PageComponent(state.item);
        }

        this.appendChild(this.page);
    }
}
customElements.define('dashboard-root', DashboardApp);
