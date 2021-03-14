export interface Config {
    sections: Section[];
}

export interface Item {
    name?: string;
    icon?: string;
    link?: string;
    sections?: Section[];
}

export interface Section {
    backgroundColor?: string;
    items: Item[];
}