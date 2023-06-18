import React from 'react';
import Iframe from 'react-iframe';
import { Container, Row, Col, Image } from 'react-bootstrap';
import avatar from '../../static/avatar.jpg';
// import styles from '../../styles/home.css'

class Home extends React.Component {

    render() {
        const imageStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
        const textStyle = { display: 'flex', justifyContent: 'left', alignItems: 'center', fontSize: 20 };
        return (
            <Container>
                <Row>
                    <Col md={8} xs={12} style={textStyle}>
                        <p>
                            Hi! 👋 <br /><br />
                            I create tools to help people build better products. Currently, I am building <a href="https://www.enterpret.com/" target="_blank" rel="noreferrer">Enterpret</a>.
                            <br /><br />
                            I graduated from IIIT-H with a B.Tech and an MS in CSE. My <a href="/research">research</a> focused on improving the reliability of online news. 
                            In other gigs, I've been a behavioral economics researcher at NTU, Taipei, a senior engineer at Samsung Research, engineered systems at a few
                            early-stage startups, and developed web-apps while freelancing for the Delhi Government, Indian Railways, among others.
                            <br /><br />
                            I enjoy non-fiction, rock music and working out. I frequently travel solo to off-beat destinations. I like changes. 
                            I share my thoughts and ideas on <a href="https://twitter.com/vi_kaushal" target="_blank" rel="noreferrer">Twitter</a>,  
                            and long form content on <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">my notes</a>.
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