import { Harp } from "../Hooks/types";
import xmlReader from "./xml";

const baseUrl = (path: string) => `./assets/xml/hc/${path}.xml`;

export const getNameHarps = async () => {
    const response = await fetch("./data/nomeDasHarpas.json");
    const dataListJson = await response.text();
    const dataList = JSON.parse(dataListJson);

    return dataList;
}

export const getHarp = async (harp: string): Promise<Harp> => {
    const xmlDoc = await xmlReader(baseUrl(harp));
    const title = xmlDoc.querySelector('title')?.textContent as string;
    const verses =[...xmlDoc.querySelectorAll('verse')].map(v => {
        const name = v.getAttribute("name") as string;
        const linesElement = v.querySelector("lines") as Element;
        const lines: string[] = [];

        linesElement.childNodes.forEach(c => {
            if (c.textContent)
                lines.push(c.textContent)
        })
        
        return {
            name,
            lines
        }
    });

    return {
        title,
        verses
    }
}