import { useState, useMemo, Fragment } from "react";
import { List, ListItemText, Collapse, ListItemButton} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ListLocationsProps {
    stateCountyData: { [key: string]: { name: string; GISJOIN: string }[] };
    setSelectedState?: (state: string) => void;
    setSelectedCounty?: (county: string) => void;
}

export default function ListLocations({ stateCountyData, setSelectedState, setSelectedCounty }: ListLocationsProps) {
    const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});
    const [openAllStates, setOpenAllStates] = useState<boolean>(false);

    const toggleState = (stateName: string) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [stateName]: !prevState[stateName]
        }));
    };

    const isStateOpen = (stateName: string) => {
        return !!openStates[stateName];
    };

    const renderCounties = (stateName: string) => {
        return stateCountyData[stateName].map((county) => (
            <div style={{ marginLeft: "40px" }} key={county.name}>
                <ListItemButton onClick={() => {
                    toggleState(stateName);
                    setSelectedState && setSelectedState(stateName);
                    setSelectedCounty && setSelectedCounty(county.name);
                }}>
                    <ListItemText primary={county.name} />
                </ListItemButton>
            </div>
        ));
    };
    

    const renderAllStates = useMemo(() => {
        return Object.keys(stateCountyData).map((stateName, index) => (
            <Fragment key={index}>
                <div style={{ marginLeft: "20px" }}>
                    <ListItemButton onClick={() => toggleState(stateName)}>
                        <ListItemText primary={stateName} />
                        <ExpandMoreIcon style={{ transform: isStateOpen(stateName) ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </ListItemButton>
                    <Collapse in={isStateOpen(stateName)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {renderCounties(stateName)}
                        </List>
                    </Collapse>
                </div>
            </Fragment>
        ));
    }, [stateCountyData, openStates]);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={() => setOpenAllStates(!openAllStates)}>
                <ListItemText primary="States" />
                <ExpandMoreIcon style={{ transform: openAllStates ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </ListItemButton>
            <Collapse in={openAllStates} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {renderAllStates}
                </List>
            </Collapse>
        </List>
    );
}
