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
                            I work on the intersection of technology and human behavior to create products that are intuitive, powerful, and delightful. Currently, I am working on building <a href="https://www.enterpret.com/" target="_blank" rel="noreferrer">Enterpret</a>.
                            <br /><br />
                            I graduated from IIIT Hyderabad with a B.Tech and an MS in Computer Science and Engineering in 2021. My <a href="/research">research</a> focused on Human-Computer Interaction at the Cognitive Sciences Lab. 
                            I was a visiting research student of Behavioral Economics at NTU, Taipei in the summers of 2019 and a Senior Engineer at Samsung Research in 2021.
                            <br /><br />
                            I enjoy reading non-fiction, listening to rock music and working out. I frequently travel solo to off-beat destinations. I like changes.
                            <br /><br />
                            Subscribe to <a href="https://vivekkaushal.substack.com" target="_blank" rel="noreferrer">The Iterative Newsletter</a> to stay in touch! ✨<br /><br />
                        <Iframe url="https://vivekkaushal.substack.com/embed" width="350" height="80"></Iframe>
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