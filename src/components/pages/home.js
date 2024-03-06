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
                        I am a <a href="https://en.wikipedia.org/wiki/Hacker" target="_black">hacker</a>. I am deeply curious about technology, and human behaviour. I graduated out of IIIT-H as a software engineer with a masters in cognitive neuroscience.
                            <br /><br />
                            I've been a behavioral economics researcher at NTU, Taipei, a senior engineer at Samsung Research, engineered backend systems for a few early stage startups, and developed widely-used apps for the Delhi Government and Indian Railways.
                            <br /><br />
                            I started my <i>career</i> as a backend engineer, but the latter of my curiosities drove me towards empathizing with users, and I work as a Product Manager today at <a href="https://enterpret.com" target="_black">Enterpret</a>, building a state-of-art AI tool that helps the best product teams on the planet learn from their customers' feedback.
                            <br /><br />
                            I like coffee, non-fiction and indie rock music. I spend a lot of time hacking on AI agents and I challenge myself to go on adventures from time to time. I share what I learn on <a href="https://twitter.com/vi_kaushal" target="_blank" rel="noreferrer">X</a>, and on my blog <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">Empathetic Hacking</a>.
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
