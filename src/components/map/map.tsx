import React, { Dispatch, SetStateAction } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps"

interface IProps {
    continent: string;
    setContinent: Dispatch<SetStateAction<string>>;
}


function Map(props: IProps) {

    const initColorsGeography: any = {
        "North America": '#33A2A5',
        "South America": '#33A2A5',
        "Africa": '#5B822F',
        "Europe": '#FFAF3B',
        "Asia": '#CC5636',
        "Oceania": '#c3c3c3'
    };

    const constCenterGeography: any = {
        "default": [0, 20],
        "North America": [-132.82470093360928, 35.91789590645403],
        "South America": [-93.09461453859858, -18.457779236588348],
        "Africa": [-13.95426046428222, 5.561515108915941],
        "Europe": [-12.763935310316684, 48.799384037502364],
        "Asia": [44.46758831830023, 32.90638963553997],
        "Oceania": [99.61724207420387, -25.104308098481635],
        "america": [-67.78410166288795, 23.49927956111437],
        "africa": [-13.95426046428222, 5.561515108915941],
        "europa": [-12.763935310316684, 48.799384037502364],
        "asia": [44.46758831830023, 32.90638963553997],
        "oceania": [99.61724207420387, -25.104308098481635],
        "Antarctica": [-62.125696141000304, 90],
    };

    const onClickCountry = (geography: any) => {
        let continent = geography.properties.continent;
        props.setContinent(continent)
    }

    return (
        <ComposableMap
            width={980}
            height={551}
            style={{ width: "100%", height: "auto" }}
        >
            <ZoomableGroup center={constCenterGeography[props.continent.toString()]} zoom={1.5} >
                <Geographies geography={"https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json"}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            return <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => onClickCountry(geo)}
                                style={{
                                    default: {
                                        fill: initColorsGeography[geo.properties.continent],
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#607D8B",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: initColorsGeography[geo.properties.continent],
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                }} >

                            </Geography>
                        }

                        )
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}

export default Map;