import { IconComponent } from "./icon.component";
import { Item } from "../../models/config.interface";

const MOCK_ITEM: Item = {
  name: "Github",
  icon: "svg/github-logo.svg",
};

const mockDashboardState = () =>
  ({
    listeners: new Map(),
  } as any);

describe("Icon Component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("should create", () => {
    const component = new IconComponent(mockDashboardState(), MOCK_ITEM);
    expect(component).toBeTruthy();
  });

  it("should load element in DOM", () => {
    const component = new IconComponent(mockDashboardState(), MOCK_ITEM);
    document.body.appendChild(component);
    expect(document.querySelector("dashboard-icon img")).toBeTruthy();
  });

  it("calling IconComponent's DashboardState listener should result in $.render() being called", () => {
    const state = mockDashboardState();
    const component = new IconComponent(state, MOCK_ITEM);
    spyOn(component, "render");

    state.listeners.get(component.index)(null);

    expect(component.render).toHaveBeenCalled();
  });

  it("icon src attribute should be 'http://localhost/assets/svg/github-logo.svg'", () => {
    const component = new IconComponent(mockDashboardState(), MOCK_ITEM);
    document.body.appendChild(component);

    const image: HTMLImageElement = document.querySelector(
      "dashboard-icon img"
    );
    expect(image.src).toEqual("http://localhost/assets/svg/github-logo.svg");
  });

  it("should set icon square's background color to designated if exists", () => {
    const component = new IconComponent(mockDashboardState(), {
      ...MOCK_ITEM,
      backgroundColor: "red",
    });

    expect(component.style.backgroundColor).toEqual("red");
  });

  it("should have white background color by default", () => {
    const component = new IconComponent(mockDashboardState(), MOCK_ITEM);

    expect(component.style.backgroundColor).toEqual("white");
  });
});
