import {AppState} from "../../services/state.service";

export class GoBackComponent extends HTMLElement {
    connectedCallback() {
        this.onclick = () => AppState.item = AppState.previousItem;

        this.innerHTML = 'go back';
    }
}

customElements.define('dashboard-go-back', GoBackComponent);
