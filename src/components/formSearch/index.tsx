

import React, { Dispatch, SetStateAction } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { ContinentContext } from "../../context/continentContext";


interface IProps {
    continent: string;
    setContinent: Dispatch<SetStateAction<string>>;
}


function ListCountries(props: IProps) {
    const { continents } = React.useContext(ContinentContext) as ContextType;

    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
            <div className="card list-continents">
                <span className="title">Buscador</span>
                <div >
                    {/* <input style={{ flex: 1 }} /> */}
                    <Form style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormGroup>
                                <Label for="exampleEmail">Código</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Continente</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option >...</option>
                                    {continents && continents.map((continent, i) => {
                                        return <option key={i}>{continent.name}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Moneda</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <Button className="btn-more">Buscar</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ListCountries;
