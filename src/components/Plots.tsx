import { useState } from "react";
import { List, ListItemText, Collapse, ListItemButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VowelPieChart from "./plots/VowelPieChart";
import LettersLineChart from "./plots/LettersLineChart";
import LettersHistogram from "./plots/LettersHistogram";

interface PlotsProps {
    stateCountyData: { [key: string]: { name: string; GISJOIN: string }[] };
}

export default function Plots({stateCountyData}:PlotsProps) {
    const [openPlots, setOpenPlots] = useState<number[]>([]);

    const handlePlotToggle = (index: number) => {
        setOpenPlots((prevOpenPlots) => {
            if (prevOpenPlots.includes(index)) {
                return prevOpenPlots.filter((i) => i !== index);
            } else {
                return [...prevOpenPlots, index];
            }
        });
    };

    const renderPlot = (plotName: string, index: number, PlotComponent: React.ComponentType<any>) => (
        <>
            <ListItemButton onClick={() => handlePlotToggle(index)}>
                <ListItemText primary={plotName} />
                <ExpandMoreIcon />
            </ListItemButton>
            <Collapse in={openPlots.includes(index)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <PlotComponent stateCountyData={stateCountyData} />
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    );

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {renderPlot("Vowel vs Consonants", 0, VowelPieChart)}
            {renderPlot("Number of Letters by County", 1, LettersLineChart)}
            {renderPlot("Bar Chart", 2, LettersHistogram)}
        </List>
    );
}
