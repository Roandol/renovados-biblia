import { Book, Cap, Verse, Biblia } from "../Hooks/useBible";

export const getBible = async (version: string) => {
    const response = await fetch(`./assets/xml/${version}.xml`);
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    const xmlBooks = [...xmlDoc.querySelectorAll("book")];
    const books: Book[] = getBooks(xmlBooks);
    const newBible: Biblia = {
        books,
        version: version
    }

    return newBible;
}

function getBooks(xmlBooks: Element[]) {
    const books = xmlBooks.map((b) => {
        const title = b.getAttribute("name") || "";
        const caps = getCaps(b);

        return {
            title,
            caps
        }

    })

    return books;
}

function getCaps(book: Element): Cap[] {
    const caps = [...book.querySelectorAll("c")].map(c => {
        const number = Number(c.getAttribute("n"));
        const verses = getVerss(c);

        return {
            number,
            verses
        }
    });

    return caps;

}

function getVerss(cap: Element): Verse[] {
    const verss: Verse[] = [...cap.querySelectorAll("v")].map(v => {
        const number = Number(v.getAttribute("n"));
        const content = v.textContent || "";

        return {
            number,
            content
        }
    });

    return verss

}