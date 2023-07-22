import React from 'react';
import Iframe from 'react-iframe';
import { Container, Row, Col, Image } from 'react-bootstrap';
import avatar from '../../static/avatar.jpg';
// import styles from '../../styles/home.css'

class Home extends React.Component {

    render() {
        const imageStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
        const textStyle = { display: 'flex', justifyContent: 'left', alignItems: 'center', fontSize: 18 };
        return (
            <Container>
                <Row>
                    <Col md={8} xs={12} style={textStyle}>
                        <p>
                            Hello! 👋 <br /><br />
                            I build software products. Currently, I'm helping product teams understand customer feedback at <a href="https://www.enterpret.com/" target="_blank" rel="noreferrer">Enterpret</a>.
                            <br /><br />
                            I am optimistic about technology's potential to exponentially boost human productivity, and I am fascinated by the biases of human behavior. 
                            <br /><br />
                            I graduated from IIIT-H with a B.Tech and an MS in Computer Science and Engineering, with a specialization in Cognitive Neuroscience.
                            
                            In other gigs, I've been a behavioral economics researcher at NTU, Taipei, a senior engineer at Samsung Research, engineered backend systems for a few
                            early-stage startups, and developed widely-used web-apps to help the community for the Delhi Government, Indian Railways, among others.
                            <br /><br />
                            I enjoy non-fiction, rock music and working out. I share my thoughts and ideas on <a href="https://twitter.com/vi_kaushal" target="_blank" rel="noreferrer">Twitter</a>,  
                            and long form content on my newsletter <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">The Indie Product</a>.
                            <br /><br />
                            Subscribe to stay in touch! ✨<br /><br />
                        <Iframe url="https://vivekkaushal.substack.com/embed" width="350" height="70"></Iframe>
                        </p>
                    </Col>
                    <Col md={4} xs={0} style={imageStyle} >
                        <Image height="40%" src={avatar} alt="Vivek Kaushal Image" roundedCircle />
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container>
        );
    }
}

export default Home;