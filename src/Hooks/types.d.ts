export interface Verse {
    number: number;
    content: string;
}

export interface Cap {
    number: number;
    verses: Verse[];
}

export interface Book {
    title: string;
    caps: Cap[];
}

export interface Biblia {
    books: Book[];
    version: string;
}

export interface Verses {
    name: string,
    lines: string[]
}

export interface Harp {
    title: string,
    verses: Verses[]
}