import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        const noDecor = {color : "inherit"};
        return (
            <Navbar bg="white" expand="lg" sticky="top">
                <Container >
                    <Navbar.Brand href="/">Vivek Kaushal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link> <Link to='/blog' style={noDecor}> Blog </Link></Nav.Link>
                            <Nav.Link> <Link to='/projects' style={noDecor}> Projects </Link></Nav.Link>
                            <Nav.Link> <Link to='/research' style={noDecor}> Research </Link></Nav.Link>
                            <Nav.Link> <Link to='/bucketlist' style={noDecor}> Bucket-List</Link> </Nav.Link>
                            {/* <Nav.Link href="/resources"> Resources </Nav.Link> */}
                            <Nav.Link> <Link to='/resume' style={noDecor}> Resume </Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;