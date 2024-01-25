import { useCallback, useEffect, useState } from "react";
import { getAllBooks, getCapNumber, getVers } from "../Services/bible";
import { Verse } from "./types";

const useBible = () => {
    const [version, setVersion] = useState("NVI");
    const [books, setBooks] = useState<string[]>([]);
    const [capNumbers, setCapNumbers] = useState<{ number: number }[]>([]);

    const [bookSelected, setBookSelected] = useState("");
    const [capSelected, setCapSelected] = useState(0);
    const [versesSelected, setVerseSelected] = useState<Verse[]>();

    const [rangeVerse, setRangeVerse] = useState<number[]>([]);

    const searchVerse = useCallback(async (range: number[], _version?: string, cap?: number) => {
        const verses = await getVers(bookSelected, cap ?? capSelected, range, _version ?? version);

        setVerseSelected(verses);

        const test = JSON.stringify(range) !== JSON.stringify(rangeVerse);
        if (test)
            setRangeVerse(range);
    }, [version, bookSelected, capSelected, rangeVerse]);

    const changeVersion = useCallback((version: string) => {
        setVersion(version);
        searchVerse(rangeVerse, version);
    }, [rangeVerse, searchVerse])

    const changeCap = useCallback((cap: number) => {
        setCapSelected(cap);
        searchVerse(rangeVerse, version, cap);
    }, [rangeVerse, searchVerse, version])

    const changeBook = useCallback(async (book: string) => {
        setBookSelected(book);

        setCapNumbers(await getCapNumber(version, book));
    }, [version])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllBooks(version);
            const nameBooks = data.map(b => b.getAttribute("name") as string);

            setBooks(nameBooks);
        }

        fetchData();
    }, [version])

    return {
        version,
        books,
        versesSelected,
        bookSelected,
        capSelected,
        capNumbers,
        changeVersion,
        searchVerse,
        changeCap,
        changeBook
    }
}

export default useBible;