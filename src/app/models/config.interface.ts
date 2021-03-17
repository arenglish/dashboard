export interface Config {
    sections: Section[];
}

export interface Item {
    name?: string;
    icon?: string;
    link?: string;
    sections?: Section[];
    backgroundColor?: string;
}

export interface Section {
    backgroundColor?: string;
    items: Item[];
}