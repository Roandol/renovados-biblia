const xmlReader = async (path: string): Promise<Document> => {
    const response = await fetch(path);
    const xmlText = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlText, "text/xml");

    return xmlDoc;
}

export default xmlReader;