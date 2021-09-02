

import React, { useEffect, Dispatch, SetStateAction } from 'react';
import gql from 'graphql-tag'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks'
import Select from 'react-select'
import { ContinentContext } from "../../context/continentContext";

import americaLogo from '../../assets/img/america.svg'


interface IProps {
    continent: string;
    setContinent: Dispatch<SetStateAction<string>>;
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const continentsSelect = (continents: IContinent[]) => {
    let select: any[] = []
    continents.forEach(continent => {
        select.push({
            value: continent.code,
            label: continent.name
        })
    })
    return select
}


const GET_FEED_FILTER = (codeContinent: String, codeCountry: string) => {

    return (gql`
    query FeedFilter {
        countries(filter:{ continent:{eq:${codeContinent}}}){
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
`)
}

export const GET_COMMENTS: any = gql`
    query GET_COMMENTS($id: Int){ // $id is the variable name
        comments(id: $id) {
            userId,
            text,
            creationDate,
      }
    }
`;


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


function RenderCardContinent(continent: IContinent, continent_name: string, dropdownOpen: string, setDropdownOpen: Dispatch<SetStateAction<string>>) {
    return (
        <div className={`item-continent item-continent--${continent_name.split(" ")[0]} ${dropdownOpen === continent_name ? 'item-continent--open' : 'item-continent--hiden'} `}>
            <div className="picture align-self-center">
                <img alt={continent_name} src={americaLogo} />
            </div>
            <div className="detail align-self-center">
                <span className="detail__title">Región Geografica</span>
                <span className="name-continent">{continent_name}</span>
                {/* <Dropdown className="detail__drop" nav inNavbar> */}
                <Dropdown isOpen={dropdownOpen === continent_name} toggle={() => {
                    if (dropdownOpen === continent_name) {
                        setDropdownOpen("default")
                    } else {
                        console.log(continent_name)
                        setDropdownOpen(continent_name)
                    }
                }} className="detail__drop" nav inNavbar>
                    <DropdownToggle nav caret>Ver paises</DropdownToggle>
                    <DropdownMenu right>
                        <div className="d-flex mb-2">
                            <div className="detail detail--border align-self-center flex-fill pb-2 ml-0">
                                <span className="detail__title">Paises</span>
                            </div>
                            <div className="circle-percentage ml-auto align-self-center"></div>
                        </div>
                        <div>
                            {continent.countries.length > 0 &&
                                continent.countries.map((country, i) =>
                                    renderListCountry(country, i)
                                )
                            }
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}



function ListCountries(props: IProps) {
    const { loading, data, error } = useQuery(GET_FEED_FILTER("CO", "SA"))
    const { continents, countries, saveCountries } = React.useContext(ContinentContext) as ContextType;

    useEffect(() => {
        if (data) {
            /*        let NewContinent: IContinent[] = data.continents
                   saveCountries(NewContinent); */
            console.log(data)
        }
    }, [data])
    console.log(continents, "asdfasdfas")
    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
            <div className="card list-continents">
                <span className="title">Buscador</span>
                <div>
                    <input />
                    <Select options={continentsSelect(continents)} />
                </div>

                {/*    {loading &&
                    <span>Cargando...</span>
                } */}
                {/* {continents.length > 0 && RenderList(continents, props.continent, props.setContinent)} */}
                {/* 
                {continent.countries.length > 0 &&
                    continent.countries.map((country, i) =>
                        renderListCountry(country, i)
                    )
                } */}
                <div className="d-flex justify-content-center">
                    <button className="btn-more">Buscar</button>
                </div>
            </div>
        </div>
    );
}

export default ListCountries;
