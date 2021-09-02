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
        "North America": [-74.03273704001933, 46.118688963419885],
        "South America": [-39.28575050574748, -28.504969661667648],
        "Africa": [34.060676091769885, 7.486077065413643],
        "Europe": [33.906567756551766, 50.70616534963902],
        "Asia": [98.66026676692498, 47.52623398513799],
        "Oceania": [155.92878902610445, -14.324072483076726],
        "america": [-67.78410166288795, 23.49927956111437],
        "africa": [34.060676091769885, 7.486077065413643],
        "europa": [33.906567756551766, 50.70616534963902],
        "asia": [98.66026676692498, 47.52623398513799],
        "oceania": [155.92878902610445, -14.324072483076726],
    };

    const onClickCountry = (geography: any) => {
        let continent = geography.properties.continent;
        console.log(continent)
        /*   continent = (continent === 'North America' || continent === 'South America') ? 'america' : continent;
          continent = continent === 'Europe' ? 'europa' : continent.toLowerCase(); */
        /*         console.log(constCenterGeography['asia']) */
        props.setContinent(continent)
        /* this.props.changeContinentDetail({ continentOpenDetail: continent, zoomMap: 1.5, centerMap: geography.properties.continent }); */
    }

    return (
        <ComposableMap
            width={980}
            height={551}
            style={{ width: "100%", height: "auto" }}
        >
            <ZoomableGroup center={constCenterGeography[props.continent.toString()]} zoom={1.5}>
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