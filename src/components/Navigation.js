import { Navbar, Nav } from 'react-bootstrap';
import BeerIcon from '../assets/beer_icon.png';


function Navigation() {
    return (
        <div>

            <Navbar bg="dark" variant="dark">
                <img src={BeerIcon} width="50" height="50" className="d-inline-block align-top" alt="React Bootstrap logo"/>
                <Navbar.Brand href="/">Punk Beers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link href="/">Browse</Nav.Link>
                    <Nav.Link href="/favorites">Favorites</Nav.Link>
                </Nav>

            </Navbar>
        </div>

    );
}

export default Navigation;
