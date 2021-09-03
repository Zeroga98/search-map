

import {
    CardBody,
    CardTitle,
    ListGroup, ListGroupItem
} from 'reactstrap';


interface IProps {
    country: ICountry;
}


function DetailCountry(props: IProps) {
    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
            <CardBody>
                <CardTitle tag="h5"> {props.country.emoji} {props.country.name}</CardTitle>
                <ListGroup>
                    <ListGroupItem className="justify-content-between"> Código : {props.country.code} </ListGroupItem>
                    <ListGroupItem className="justify-content-between"> Moneda : {props.country.currency}</ListGroupItem>
                    <ListGroupItem className="justify-content-between"> Continente : {props.country.continent?.name}</ListGroupItem>
                    <ListGroupItem className="justify-content-between">Capital :{props.country.capital}</ListGroupItem>
                    <ListGroupItem className="justify-content-between">Indicativo :{props.country.phone}</ListGroupItem>
                    <ListGroupItem className="justify-content-between">Lenguajes :
                        <ul style={{ listStyle: "circle" }} >
                            {props.country.languages?.map((language, i) => {
                                return <li key={i}>{language.name}</li>
                            })}
                        </ul>
                    </ListGroupItem>
                </ListGroup>
            </CardBody>
        </div >
    );
}

export default DetailCountry;
