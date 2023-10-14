import { useEffect, useState } from "react";
import { getBible } from "../Services/bible";

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

const useBible = () => {
    const [bible, setBible] = useState<Biblia>();
    const nameBooks = bible?.books.map(b => b.title);
    const [version, setVersion] = useState<string>("NVI");
    const [book, setBook] = useState<Book>();
    const [cap, setCap] = useState<Cap>();
    const [versSearched, setVerseSearch] = useState<string[]>([]);
    const [versesSelected, setVersesSelected] = useState<Verse[]>([]);

    const changeVersion = (version: string) => {
        setVersion(version);
    }

    const searchBook = (name: string) => {
        const book = bible?.books.find(b => b.title === name);

        setBook(book);

        if (cap) {
            setCap(undefined);
        }
    }

    const searchCap = (value: number | null) => {
        const capFind = book?.caps.find(c => c.number === value);

        setCap(capFind as Cap);

        searchVerses(versSearched, capFind);

        return capFind;
    }

    const searchVerses = (value: string[], _cap?: Cap) => {
        setVerseSearch(value);

        if (value.length > 1) {
            const firstNumber = parseInt(value[0]) - 1;
            const secondNumber = parseInt(value[1]);
            let versiculoRange: Verse[] = [];


            if (_cap)
                versiculoRange = _cap.verses.slice(firstNumber, secondNumber);
            else if (cap)
                versiculoRange = cap.verses.slice(firstNumber, secondNumber);

            // console.log({ value, versSearched, versesSelected, versiculoRange });
            // console.log(versiculoRange)

            setVersesSelected(versiculoRange);

            return;
        }

        const number = Number(value);
        const verseFinded = _cap ? _cap?.verses.find(v => v.number === number) : cap?.verses.find(v => v.number === number);

        setVersesSelected(verseFinded ? [verseFinded] : []);


    }

    useEffect(() => {
        searchBook(book?.title as string);
        const teste = searchCap(cap?.number as number);
        searchVerses(versSearched, teste);
    }, [bible?.version])

    useEffect(() => {
        const fetchData = async () => {
            setBible(await getBible(version))
        }

        fetchData()
    }, [version]);

    return {
        book,
        cap,
        versesSelected,
        nameBooks,
        searchBook,
        searchCap,
        searchVerses,
        changeVersion
    }
}

export default useBible;