import { Stack, Paper, Typography, styled } from "@mui/material";
import { useState } from "react";
import ListLocations from "./ListLocations";
import SearchCounties from "./SearchCounties";
import Plots from "./Plots";

interface OverlayProps {
    stateCountyData: { [key: string]: { name: string, GISJOIN: string }[] };
    setSelectedState?: (state: string) => void;
    setSelectedCounty?: (county: string) => void;
}

export default function Overlay({ stateCountyData, setSelectedState, setSelectedCounty }: OverlayProps) {
    const [isSearching, setSearching] = useState(false);

    return (
        <StyledPaper elevation={3}>
            <Stack direction='column' alignItems='center' spacing={2}>
                <Typography align='center'></Typography>
                <SearchCounties 
                    stateCountyData={stateCountyData}
                    setSearching={setSearching}
                    setSelectedCounty={setSelectedCounty}
                    setSelectedState={setSelectedState}
                />
                {!isSearching ? (
                    <>
                    <ListLocations 
                        stateCountyData={stateCountyData}
                        setSelectedState={setSelectedState}
                        setSelectedCounty={setSelectedCounty}
                    />
                    <Plots stateCountyData={stateCountyData}/>
                    </>
                ): null }
            </Stack>
        </StyledPaper>
    );
}

const StyledPaper = styled(Paper)({
    width: '25vw',
    minWidth:'250px',
    margin: '40px auto 10px 0',
    padding: '10px',
    zIndex: 5000,
    opacity: 0.8,
    maxHeight: '80vh',
    overflowY: 'auto'
})  