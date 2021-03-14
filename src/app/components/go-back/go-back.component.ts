import {AppState} from "../../services/state.service";

export class GoBackComponent extends HTMLElement {
    connectedCallback() {
        this.onclick = () => AppState.page = AppState.previousPage;

        this.innerHTML = 'go back';
    }
}

customElements.define('dashboard-go-back', GoBackComponent);
