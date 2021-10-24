import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        const noDecor = {color : "inherit"};
        const selectedPage = this.props.page;
        return (
            <Navbar bg="white" expand="lg" sticky="top">
                <Container >
                    <Navbar.Brand href="/">Vivek Kaushal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="https://vivek-kaushal.medium.com" target="_blank"  rel="noreferrer"> Blog </Nav.Link>
                            <Nav.Link href="https://www.notion.so/Projects-861c71d3a36044758f09c45b3e66b43a" target="_blank"  rel="noreferrer"> Projects </Nav.Link>
                            {/* conditionally highlight page which is selected */}
                            <Nav.Link> <Link to='/research' style={noDecor}> Research</Link> </Nav.Link>
                            <Nav.Link> <Link to='/recommendations' style={noDecor}> Recommendations</Link> </Nav.Link>
                            <Nav.Link> <Link to='/bucketlist' style={noDecor}> Bucket-List</Link> </Nav.Link>
                            {/* <Nav.Link href="/resources"> Resources </Nav.Link> */}
                            <Nav.Link href="https://drive.google.com/file/d/1EaVMzJaFfYYfT9krtfWtHEJCM99NSS53/view?usp=sharing" target="_blank"  rel="noreferrer"> Resume </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;