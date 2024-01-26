import { useEffect, useState } from "react";
import { getHarp, getNameHarps } from "../Services/hc";
import { Harp } from "./types";

const useHarp = () => {
    const [nameHarps, setNameHarps] = useState<string[]>([]);
    const [nameHarpsFiltered, setNameHarpsFiltereds] = useState<string[]>([]);
    const [harpSelected, setHarpSelected] = useState<Harp>();

    const selectHarp = async (harp: string) => {
        const data = await getHarp(harp);
        console.log(data);


        setHarpSelected(data);
    }
    const searchHarp = (value: string) => {
        const filter = nameHarps.filter(h => h.toLowerCase().includes(value.toLowerCase().trim()));

        if (!filter.length) {
            setNameHarpsFiltereds([]);
            return;
        }

        setNameHarpsFiltereds(filter);
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getNameHarps();

            setNameHarps(data);
        }

        fetchData()
    }, [])
    return {
        nameHarps,
        harpSelected,
        nameHarpsFiltered,
        searchHarp,
        selectHarp
    }
}

export default useHarp;