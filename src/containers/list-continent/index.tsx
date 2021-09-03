

import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import {
    useQuery,
    useLazyQuery,
    gql
} from "@apollo/client";

import { ContinentContext } from "../../context/continentContext";
import CardContinent from "../../components/cardContinent/cardContinent";

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
         countries{
            code
            name
            native
            phone
            capital
            currency
            emoji
            emojiU
         }
       }
  }
`

function renderListCountry(country: ICountry, i: number) {
    return (
        <div key={i}>
            <div key={i} className="detail__content d-flex">
                <span className="country">{country.name}</span>
                <span className="percentage ml-auto">{country.emoji}</span>
            </div>
        </div>
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
    const { loading, data, error } = useQuery(GET_FEED_FILTER)
    let [getCountries, { loading: loadingCountries, data: dataCountries }] = useLazyQuery(GET_COUNTRIES_CONTINENT, { variables: { codeContinent: "SA" } })
    const { continents, saveContinents } = React.useContext(ContinentContext) as ContextType;
    const [countries, setContries] = useState({ loading: false, data: [] })

    useEffect(() => {
        if (data) {
            let NewContinent: IContinent[] = data.continents
            saveContinents(NewContinent);
        }
    }, [data])

    useEffect(() => {
        if (props.continent != 'default') {
            let currentContinent = continents.find((continent) => props.continent == continent.name)
            getCountries({ variables: { codeContinent: currentContinent ? currentContinent.code.toString() : "SA" } })
        }
    }, [props.continent])

    return (
        <div className="col-sm-12 col-md-8 col-lg-4 col-xl-3 p-0">
            <div className="card list-continents">
                <span className="title">Seleccione una región para detallar sus paises</span>
                {loading &&
                    <span>Cargando...</span>
                }
                {continents.length > 0 && RenderList(continents, props.continent, props.setContinent)}
                {props.continent != 'default' &&
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
                                    renderListCountry(country, i)
                                )
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ListContinent;
