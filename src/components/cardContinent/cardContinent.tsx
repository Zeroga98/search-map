
import { Dispatch, SetStateAction } from 'react';
import LogoContinent from "../logoContinent/logoContinent"


function CardContinent(continent: IContinent, continent_name: string, dropdownOpen: string, setDropdownOpen: Dispatch<SetStateAction<string>>) {
    return (
        <div className={`item-continent item-continent--${continent_name.split(" ")[0]} ${dropdownOpen === continent_name ? 'item-continent--open' : 'item-continent--hiden'} `}>
            <div className="picture align-self-center">
                <LogoContinent continent={continent_name.split(" ")[0]} />
            </div>
            <div className="detail align-self-center">
                <span className="detail__title">Región Geografica</span>
                <span className="name-continent">{continent_name}</span>
                <li className="detail__drop dropdown nav-item" onClick={() => {
                    if (dropdownOpen === continent_name) {
                        setDropdownOpen("default")
                    } else {
                        setDropdownOpen(continent_name)
                    }
                }}>
                    <span className="dropdown-toggle nav-link">Ver Paises</span>
                </li>
            </div>
        </div>
    )
}

export default CardContinent