import { AppState, MoveBackwardAction } from "../../services/state.service";
import { LifeCycleComponent } from "../lifecycle.component";

export class GoBackComponent extends LifeCycleComponent {
  constructor() {
    super(AppState);
  }
  connectedCallback() {
    this.onclick = () => {
      AppState.action(new MoveBackwardAction());
    };

    this.style.cursor = "pointer";
    this.innerHTML = "go back";
  }
}

customElements.define("dashboard-go-back", GoBackComponent);
