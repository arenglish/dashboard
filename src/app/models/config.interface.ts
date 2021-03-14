export interface Config {
    sections: Section[]
}

export interface Page {
    sections: Section[];
    level: number;
}

export interface Item {
    name: string;
    icon: string;
    sections?: Section[];
}

export interface Section {
    backgroundColor?: string;
    items: Item[];
}