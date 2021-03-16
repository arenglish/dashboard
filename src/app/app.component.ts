import * as CONFIG from "../dashboard.config.json";
import {
  AppState,
  Changes,
  DashboardState,
  EnterEditModeAction,
  MoveForwardAction,
} from "./services/state.service";
import "./app.component.scss";
import { PageComponent } from "./components/page/page.component";
import { LifeCycleComponent } from "./components/lifecycle.component";

export class DashboardApp extends LifeCycleComponent {
  constructor() {
    super(AppState);
  }
  onChange(changes: Changes) {
    this.renderPage(changes);
  }
  connectedCallback() {
    const rootItem = { sections: CONFIG.sections };
    AppState.mapItems(rootItem, null, 0);
    AppState.action(new MoveForwardAction(rootItem));
  }

  private page: PageComponent;

  private renderPage(changes: Changes) {
    if (changes.item) {
      const forward =
        !!AppState.previousItem &&
        AppState.mappedItems.get(AppState.item).level >
          AppState.mappedItems.get(AppState.previousItem).level;

      const oldPage = this.page;

      if (oldPage) {
        if (forward) {
          this.page = new PageComponent(this.state.item, "background");
          oldPage.flyForwards();
        } else {
          this.page = new PageComponent(this.state.item, "foreground");
          oldPage.flyBackwards();
        }
      } else {
        this.page = new PageComponent(this.state.item);
      }

      this.appendChild(this.page);
    }
  }
}
customElements.define("dashboard-root", DashboardApp);
