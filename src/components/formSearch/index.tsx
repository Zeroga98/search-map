

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { ContinentContext } from "../../context/continentContext";

import {
    useLazyQuery,
    gql
} from "@apollo/client";

interface IProps {
    continent: string;
    setContinent: Dispatch<SetStateAction<string>>;
}

const GET_COUNTRIES_CONTINENT = gql`
    query FeedFilter($codeContinent: String!, $codeCurrency: String) {
        countries(filter:{ continent:{eq: $codeContinent }, currency:{eq: $codeCurrency}}){
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





function ListCountries(props: IProps) {
    const { continents, countries, saveCountries } = React.useContext(ContinentContext) as ContextType;
    let [getCountries, { data: dataCountries }] = useLazyQuery(GET_COUNTRIES_CONTINENT)
    const [selectCurrency, setSelectCurrency] = useState("...")
    const [currency, setCurrency] = useState<string[]>([])
    const [reset, setReset] = useState<boolean>(false)

    useEffect(() => {
        if (selectCurrency !== "...") {
            let currentContinent = continents.find((continent) => props.continent === continent.name)
            getCountries({ variables: { codeContinent: currentContinent ? currentContinent.code.toString() : "SA", codeCurrency: selectCurrency } })
        } else {
            let currentContinent = continents.find((continent) => props.continent === continent.name)
            getCountries({ variables: { codeContinent: currentContinent ? currentContinent.code.toString() : "SA" } })
        }
    }, [selectCurrency, reset])

    useEffect(() => {
        if (dataCountries) {
            saveCountries(dataCountries.countries)
        }
    }, [dataCountries])

    useEffect(() => {
        if (props.continent) {
            setSelectCurrency("...")
            setCurrency([])
        }
    }, [props.continent])

    useEffect(() => {
        if (countries) {
            let currentCurrency = currency;
            countries.map(country => {
                if (!currency.includes(country.currency)) {
                    currentCurrency.push(country.currency)
                }
            })
            setCurrency([...currentCurrency])
        }
    }, [countries])

    const filterName = (name: string) => {
        if (name === "") {
            setReset(!reset);
        } else {
            let newConuntries = countries.filter(country => {
                return country.name.toLowerCase().includes(name.toLowerCase());
            })
            saveCountries(newConuntries)
        }
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.setContinent("default")
    }
    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
            <div className="card list-continents">
                <span className="title">Buscador</span>
                <div >
                    <Form style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }} onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormGroup style={{ marginRight: "15px" }}>
                                <Label for="exampleSelect" className="label">Continente</Label>
                                <Input type="select" name="select" value={props.continent} onChange={(event) => { props.setContinent(event.target.value) }}>
                                    <option >...</option>
                                    {continents && continents.map((continent, i) => {
                                        return <option key={i}>{continent.name}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup style={{ marginRight: "15px" }}>
                                <Label for="exampleSelect" className="label">Moneda</Label>
                                <Input type="select" name="select" className="label" onChange={(event) => { setSelectCurrency(event.target.value) }}>
                                    <option>...</option>
                                    {currency.map((item, i) => {
                                        return <option key={i}>{item}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Pais</Label>
                                <Input type="email" name="email" className="label" placeholder="Nombre del pais" onChange={(event) => filterName(event?.target.value)} />
                            </FormGroup>
                        </div>
                        <Button className="btn-more">Reset</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ListCountries;
