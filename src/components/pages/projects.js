import React from 'react';
import { Card, Row, Col, Container, ButtonGroup, Button } from 'react-bootstrap';
import projects from '../../static/projects.json';

class Projects extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: '25px' }}>

                {projects["projects"].map((project) => {
                    // Dynamically require the image from the local path
                    const imgSrc = require(`../../static/projects/${project.image}`);
                    
                    return (
                        <Row key={project.name} style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Use the dynamically required image source */}
                                <img src={imgSrc} alt={project.name} style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '10px' }} />
                            </Col>
                            <Col md={8}>
                                <Card style={{ border: 'none', boxShadow: 'none' }}>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{project.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{project.date}</Card.Subtitle>
                                        <Card.Text style={{ fontSize: '1rem' }}>
                                            {project.description}
                                        </Card.Text>
                                        <ButtonGroup size="sm" aria-label="Controls" style={{ marginTop: '10px' }}>
                                            {project.appLink && (
                                                <Button variant="light" style={{ margin: '0 5px' }} onClick={() => window.open(project.appLink, "_blank")}>App</Button>
                                            )}
                                            {project.codeLink && (
                                                <Button variant="light" style={{ margin: '0 5px' }} onClick={() => window.open(project.codeLink, "_blank")}>Code</Button>
                                            )}
                                            {project.blogLink && (
                                                <Button variant="light" style={{ margin: '0 5px' }} onClick={() => window.open(project.blogLink, "_blank")}>Read More</Button>
                                            )}
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    );
                })}

            </Container>
        );
    }
}

export default Projects;
