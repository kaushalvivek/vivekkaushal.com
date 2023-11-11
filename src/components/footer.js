import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../styles/footer.css'; // Make sure to create this CSS file

class Footer extends React.Component {
    render() {
        return (
            <Container fluid className="footer-container">
                <Row className="justify-content-center">
                    <p>Find me on:</p>
                </Row>
                <Row className="justify-content-center social-row">
                    <Col md={3} xs={6} className="social-column">
                        <FaEnvelope className="social-icon" /><a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer"> Empathetic Hacking</a>
                    </Col>
                    <Col md={3} xs={6} className="social-column">
                        <FaGithub className="social-icon" /><a href="https://github.com/kaushalvivek" target="_blank" rel="noreferrer"> kaushalvivek</a>
                    </Col>
                    <Col md={3} xs={6} className="social-column">
                        <FaTwitter className="social-icon" /><a href="https://twitter.com/vi_kaushal" target="_blank" rel="noreferrer"> vi_kaushal</a>
                    </Col>
                    <Col md={3} xs={6} className="social-column">
                        <FaLinkedin className="social-icon" /><a href="https://linkedin.com/in/kaushalvivek" target="_blank" rel="noreferrer"> kaushalvivek</a>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Footer;
