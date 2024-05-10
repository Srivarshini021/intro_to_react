import stateData from "../library/state_data.json";
import countyData from "../library/county_data.json";

interface LocationData {
    name: string;
    GISJOIN: string;
}

export default function loadJSON(): { [key: string]: LocationData[] } {
    const stateCountyDict: { [key: string]: LocationData[] } = {};

    countyData.forEach((county: LocationData) => {
        const stateGISJOINPrefix = county.GISJOIN.substring(0, 4);
        const stateDataMatch: LocationData | undefined = stateData.find((state: LocationData) =>
             state.GISJOIN === stateGISJOINPrefix) as LocationData | undefined;
        if (stateDataMatch) {
            const stateName = stateDataMatch.name;
            if (!stateCountyDict[stateName]) {
                stateCountyDict[stateName] = [];
            }
            stateCountyDict[stateName].push(county);
        }
    });

    return stateCountyDict;
}