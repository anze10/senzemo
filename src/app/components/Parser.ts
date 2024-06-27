const parseJsonString = (jsonString: string): string[] => {
    try {
        // Parsiramo JSON string v objekt
        const jsonObject = JSON.parse(jsonString);

        // Pretvorimo objekt v niz in ločimo na posamezne elemente z vejico
        const jsonStringified = JSON.stringify(jsonObject);
        const elements = jsonStringified.split(',').map(element => element.trim());

        return elements;
    } catch (error) {
        console.error("Error parsing JSON string:", error);
        return [];
    }
};

export default parseJsonString;
