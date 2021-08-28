import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

class Projects extends React.Component {
    render() {
        return (
            <Container>
                <h1>Projects</h1>
                <Row>
                    <Col>
                        <Card
                            bg='light'
                            key='0'
                            text='dark'
                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Header>Full-Stack Development</Card.Header>
                            <Card.Body>
                                <Card.Title>Skillbee Backend Architecture </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Projects;