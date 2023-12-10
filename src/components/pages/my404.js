import React from 'react';
import { Container, Row, Col,  Button } from 'react-bootstrap';

class My404 extends React.Component {
    render() {
        const pad = {padding: 15};
        return (
            <Container>
                <h1>Not quite what you were looking for ... 🤔</h1>
                <Row style={pad}>
                    <p>
                    It is likely that you were looking for my blog. It's now on Substack. 
                    <br/> You can find it at <a href="https://vivekkaushal.substack.com">vivekkaushal.substack.com</a>
                    </p>
                </Row>
                <Row>
                    <Col md={4} xs={6} style={pad}>
                        <Button variant ="outline-dark" href="https://vivekkaushal.com">Go back home</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default My404;