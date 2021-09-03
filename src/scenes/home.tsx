import { useState } from 'react';

import ListContinent from '../containers/list-continent';
import FormSearch from '../components/formSearch';
import Map from '../components/map/map';
/* import { ContinentContext } from "../context/continentContext"; */

function Home(props: any) {

    /* const { continents } = useContext(ContinentContext) as ContextType; */

    const [continent, setContinent] = useState<string>("default")

    return (
        <div className="container b-blue">
            <div className="row justify-content-md-center" >
                <ListContinent continent={continent} setContinent={setContinent} />
                <div className="col-sm-12 col-md-12 col-lg-8 col-xl-9 p-0">
                    <FormSearch continent={continent} setContinent={setContinent}></FormSearch>
                    <Map continent={continent} setContinent={setContinent} />
                </div>
            </div>
        </div>
    );
}

export default Home;
