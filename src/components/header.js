import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="white" expand="lg" sticky="top">
                <Container >
                    <Navbar.Brand href="/">Vivek Kaushal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/blog" target="_blank" rel="noreferrer"> Blog </Nav.Link>
                            <Nav.Link href="/projects" target="_blank" rel="noreferrer"> Projects </Nav.Link>
                            <Nav.Link href="/research" target="_blank" rel="noreferrer"> Research </Nav.Link>
                            <Nav.Link> <Link to='/bucketlist'> Bucket-List</Link> </Nav.Link>
                            {/* <Nav.Link href="/r esources"> Resources </Nav.Link> */}
                            <Nav.Link href="/resume" target="_blank" rel="noreferrer"> Resume </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;