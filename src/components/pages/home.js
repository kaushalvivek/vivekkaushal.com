import React from 'react';
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
                            I am Vivek Kaushal, and currently, I am working on building <a href="https://www.enterpret.com/" target="_blank" rel="noreferrer">Enterpret</a>.
                            <br /><br />
                            I graduated out of IIIT Hyderabad, India with a B.Tech and an MS in Computer Science and Engineering in 2021. My <a href="/research">research</a> focused on Human Computer Interaction at the Cognitive Sciences Lab. 
                            Additionally, I have been a visiting research student studying Economics at the National Taiwan University, Taipei in 2019.
                            <br /><br />
                            I enjoy creating minimalist solutions that leverage technology to make lives easier.
                            You can checkout my <a href="/projects">projects</a> and <a href="https://vivek-kaushal.com" target="_blank"  rel="noreferrer">blog</a> to know more about my work, experiences and learnings.
                            <br /><br />
                            I enjoy reading non-fiction, listening to old rock and working out. I frequently travel solo to off-beat destinations. I like changes.
                            <br /><br />
                            Follow me on <a href="https://twitter.com/vi_kaushal" target="_blank"  rel="noreferrer">Twitter</a> to stay in touch! 🚀
                        </p>
                    </Col>
                    <Col md={4} xs={0} style={imageStyle} >
                        <Image height="40%" src={avatar} alt="Vivek Kaushal Image" roundedCircle />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;