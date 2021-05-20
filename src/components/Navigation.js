import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
// import BrowsePage from 'BrowsePage.js';
// import FavPage from 'FavPage.js';
import { Navbar, Nav } from 'react-bootstrap';


function Navigation() {
    return (
        <div>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">BEEEEERS</Navbar.Brand>
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
