

import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import {
    useQuery,
    useLazyQuery,
    gql
} from "@apollo/client";

import { ContinentContext } from "../../context/continentContext";
import CardContinent from "../../components/cardContinent/cardContinent";
import DetailCountry from "../../components/detailCountry/detailCountry"
interface IProps {
    continent: string;
    setContinent: Dispatch<SetStateAction<string>>;
}

const GET_COUNTRIES_CONTINENT = gql`
    query FeedFilter($codeContinent: String!) {
        countries(filter:{ continent:{eq: $codeContinent }}){
            code
            name
            native
            phone
            continent{
              name
              code
            }
            capital
            currency
            languages{
              name
              code
              native 
              rtl
            }
              emoji   
          }
          }
`


const GET_FEED_FILTER = gql`
  query FeedFilter {
        continents(filter:{code:{nin:""}}){
         code
         name
       }
  }
`

function RenderListCountry(country: ICountry, i: number, saveCountry: Dispatch<SetStateAction<ICountry>>) {
    return (
        <button key={i} className="detail__content d-flex w-100" onClick={() => { saveCountry(country) }} >
            <span className="country text-left">{country.name}</span>
            <span className="percentage ml-auto">{country.emoji}</span>
        </button>
    )
}

function RenderList(continents: IContinent[], dropdownOpen: string, setDropdownOpen: Dispatch<SetStateAction<string>>) {

    return continents.map((continent, i) => {
        let labelContinent = continent.name;
        return <React.Fragment key={i}>{CardContinent(continent, labelContinent, dropdownOpen, setDropdownOpen)}</React.Fragment>
    }
    )
}

function ListContinent(props: IProps) {
    const { loading, data } = useQuery(GET_FEED_FILTER)
    let [getCountries, { data: dataCountries }] = useLazyQuery(GET_COUNTRIES_CONTINENT, { variables: { codeContinent: "SA" } })
    const { continents, saveContinents, country, saveCountry } = React.useContext(ContinentContext) as ContextType;
    const [currentCountry, setCurrentCountry] = useState<ICountry>(country)

    useEffect(() => {
        if (data) {
            let NewContinent: IContinent[] = data.continents
            saveContinents(NewContinent);
        }
    }, [data])

    useEffect(() => {
        if (props.continent !== 'default') {
            let currentContinent = continents.find((continent) => props.continent === continent.name)
            getCountries({ variables: { codeContinent: currentContinent ? currentContinent.code.toString() : "SA" } })
        }
        saveCountry({ code: "", name: "", native: "", phone: "", capital: "", currency: "", emoji: "", emojiU: "" })
    }, [props.continent])

    useEffect(() => {
        if (currentCountry) {
            saveCountry(currentCountry)
        }
    }, [currentCountry])

    return (
        <div className="col-sm-12 col-md-8 col-lg-4 col-xl-3 p-0">
            <div className="card list-continents">
                <span className="title">Seleccione una región para detallar sus paises</span>
                {loading &&
                    <span>Cargando...</span>
                }
                {continents.length > 0 && RenderList(continents, props.continent, props.setContinent)}
                {props.continent !== 'default' &&
                    <>
                        <div className={`item-continent item-continent--${props.continent} item-continent--none item-continent--open`}>
                            <div className="dropdown-menu dropdown-menu-right show">
                                <div className="d-flex mb-2">
                                    <div className="detail detail--border align-self-center flex-fill pb-2 ml-0">
                                        <span className="detail__title">Paises</span>
                                    </div>
                                    <div className="circle-percentage ml-auto align-self-center"></div>
                                </div>

                                {dataCountries?.countries?.length > 0 &&
                                    dataCountries.countries.map((country: any, i: number) =>
                                        RenderListCountry(country, i, setCurrentCountry)
                                    )
                                }
                            </div>
                        </div>
                        {country.name !== "" &&
                            <div className={`item-continent item-continent--${props.continent} item-continent--none item-continent--open`}>
                                <div className="dropdown-menu dropdown-menu-detail show">
                                    <DetailCountry country={country} />
                                </div>
                            </div>
                        }

                    </>
                }
            </div>
        </div>
    );
}

export default ListContinent;
