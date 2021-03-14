import * as CONFIG from "../dashboard.config.json";
import { SectionComponent } from "./components/section/section.component";
import {AppState, DashboardState} from "./services/state.service";
import './app.component.scss';
import {GoBackComponent} from "./components/go-back/go-back.component";

export class DashboardApp extends HTMLElement {
    connectedCallback() {
        AppState.registerOnChange((...args) => {
            this.renderPage(...args);
        });
        AppState.page = { sections: CONFIG.sections, level: 0 };
    }
    private renderPage(state: DashboardState) {
        this.innerHTML = '';
        const section = new SectionComponent(state.page.sections[0]);
        this.appendChild(section);

        if (AppState.page.level > 0) {
            const goBack = new GoBackComponent();
            this.appendChild(goBack)
        }
    }
}
customElements.define('dashboard-root', DashboardApp);
