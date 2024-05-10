import { Autocomplete, TextField} from "@mui/material";

interface SearchCountiesProps {
    stateCountyData: { [key: string]: { name: string; GISJOIN: string }[] };
    setSearching: (state: boolean) => void;
    setSelectedState?: (state: string) => void;
    setSelectedCounty?: (county: string) => void;
}

interface County {
    name: string,
    state: string,
    GISJOIN: string
}

export default function SearchCounties({ 
    stateCountyData,
    setSearching,
    setSelectedCounty,
    setSelectedState 
}: SearchCountiesProps) {

    
    const counties: County[] = Object.entries(stateCountyData)
    .flatMap(([state, countiesInState]) => 
        countiesInState.map(county => ({
            name: county.name,
            state: state,
            GISJOIN: county.GISJOIN
        }))
    );

    return (
        <Autocomplete
            id="county-search"
            sx={{ width: '100%' }}
            options={counties}
            groupBy={(option) => option.state.toUpperCase()}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search for a county"
                    variant="outlined"
                    onFocus={() => setSearching(true)}
                    onBlur={() => setSearching(false)}
                />
            )}
            getOptionLabel={(option) => `${option.name} (${option.GISJOIN})`}
            isOptionEqualToValue={(option, value) => option.GISJOIN === value?.GISJOIN}
            onChange={(event, selectedCounty) => {
                if (selectedCounty && setSelectedCounty && setSelectedState) {
                    setSelectedCounty((selectedCounty as County).name);
                    setSelectedState((selectedCounty as County).state);
                } 
            }}
        />
    );
}
