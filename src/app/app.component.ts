import * as CONFIG from "../dashboard.config.json";
import { SectionComponent } from "./components/section/section.component";
import {AppState, DashboardState} from "./services/state.service";
import './app.component.scss';
import {GoBackComponent} from "./components/go-back/go-back.component";
import {IconComponent} from "./components/item/icon.component";
import {PageComponent} from "./components/page/page.component";

export class DashboardApp extends HTMLElement {
    connectedCallback() {
        AppState.mapItems(CONFIG, null)
        AppState.registerOnChange((...args) => {
            this.renderPage(...args);
        });
        AppState.item = CONFIG;
    }
    private renderPage(state: DashboardState) {
        this.innerHTML = '';
        const page = new PageComponent(state.item);
        this.appendChild(page);
        // if (state.item.sections && state.item.sections.length > 0) {
        //     state.item.sections.forEach(section => {
        //         console.log(section);
        //         const sectionEl = new SectionComponent(section, IconComponent);
        //         this.appendChild(sectionEl);
        //     })
        // }


        if (AppState.item !== CONFIG) {
            const goBack = new GoBackComponent();
            this.appendChild(goBack)
        }
    }
}
customElements.define('dashboard-root', DashboardApp);
