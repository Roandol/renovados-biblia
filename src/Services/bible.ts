import { Verse } from "../Hooks/types";
import xmlReader from "./xml";

const urlBase = (path: string) => `./assets/xml/bible/${path}.xml`;

export const getAllBooks = async (version: string): Promise<Element[]> => {
    const xmlDoc = await xmlReader(urlBase(version));
    const booksElements = [...xmlDoc.querySelectorAll("book")];

    return booksElements;
}

export const getVers = async (book: string, cap: number, vers: number[], version: string): Promise<Verse[]> => {
    const bookElements = await getAllBooks(version);
    const bookSelected = bookElements.find(b => b.getAttribute("name") === book) as Element;
    const capSelected = bookSelected.querySelector(`c[n="${cap}"]`) as Element;
    const [versInital, versEnd] = vers;
    const allVerss = [...capSelected.querySelectorAll("v")];
    const verssRange = allVerss.slice(versInital - 1, versEnd ?? versInital);
    const verseList: Verse[] = verssRange.map(v => ({
        number: Number(v.getAttribute("n")),
        content: v.textContent as string
    }))

    return verseList;
}

export const getCapNumber = async (version: string, book: string) => {
    const books = await getAllBooks(version);
    const bookElement = books.find(b => b.getAttribute("name") === book) as Element;
    const caps = [...bookElement.querySelectorAll("c")];
    const capNumbers = caps.map(c => ({ number: Number(c.getAttribute("n")) as number }));

    return capNumbers
}