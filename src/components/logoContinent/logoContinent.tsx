import americaLogo from '../../assets/img/america.svg'
import asiLogo from '../../assets/img/asia.svg'
import europeLogo from '../../assets/img/europa.svg'
import oceaniaLogo from '../../assets/img/oceania.svg'
import afriaLogo from '../../assets/img/africa.svg'

interface IProps {
    continent: string;
}

function LogoContinent(props: IProps) {
    return (
        <>

            {
                {
                    Africa: <img alt={props.continent} src={afriaLogo} />,
                    Antarctica: <img alt={props.continent} src={americaLogo} />,
                    North: <img alt={props.continent} src={americaLogo} />,
                    Europe: <img alt={props.continent} src={europeLogo} />,
                    Oceania: <img alt={props.continent} src={oceaniaLogo} />,
                    South: <img alt={props.continent} src={americaLogo} />,
                    Asia: <img alt={props.continent} src={asiLogo} />,
                }[props.continent]
            }
        </>
    );
}

export default LogoContinent;
