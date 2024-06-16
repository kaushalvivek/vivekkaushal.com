import React from 'react';
import Iframe from 'react-iframe';
import { Container, Row, Col, Image } from 'react-bootstrap';
import avatar from '../../static/avatar.jpg';
import '../../styles/home.css'; // Ensure this CSS file is correctly linked

class Home extends React.Component {
    render() {
        return (
            <Container className="home-container">
                <Row className="align-items-center home-row">
                    <Col md={8} className="text-section">
                        <p>
                        Hello! I am a <a href="https://en.wikipedia.org/wiki/Hacker" target="_black">hacker</a>. Deeply curious about technology and human behaviour, I graduated from IIIT-H as an engineer with a master's in cognitive neuroscience.
                            <br /><br />
                            I've engineered systems at Samsung Research and a few early stage startups, developed widely-used apps for the Delhi Government and Indian Railways, and worked as a behavioral economics researcher at NTU, Taipei.
                            <br /><br />
                            I started my <i>career</i> as a backend engineer, but the latter of my curiosities drove me towards empathizing with users, and I work as a Product Manager today at <a href="https://enterpret.com" target="_black">Enterpret</a>, helping the best product teams on the planet learn from their customers' feedback.
                            <br /><br />
                            When I am not hacking on an idea, I challenge myself to go on adventures. I like coffee, non-fiction, and indie rock music. I share what I learn on <a href="https://twitter.com/vi_kaushal" target="_blank" rel="noreferrer">X</a>, and on my blog <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">Empathetic Hacking</a>.
                            <br /><br />
                            Subscribe to stay in touch! ✨<br /><br />
                        </p>
                    </Col>
                    <Col md={4} className="image-section">
                        <Image src={avatar} alt="Vivek Kaushal Image" roundedCircle fluid />
                    </Col>
                </Row>
                <Row className="align-items-center home-row">
                <Iframe url="https://vivekkaushal.substack.com/embed" width="350" height="350" className="substack-iframe"></Iframe>
                </Row>
            </Container>
        );
    }
}

export default Home;
