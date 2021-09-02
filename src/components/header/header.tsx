import { Navbar } from 'reactstrap';

function Header(props: any) {
    return (
        <Navbar className="header d-flex justify-content-center" light expand="md">
            <h1>Lista de continentes</h1>
        </Navbar >
    );
}

export default Header;
