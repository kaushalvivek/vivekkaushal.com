import React from 'react';
import { Container, Row } from 'react-bootstrap';
import resources from '../../static/resources.json'

class Resources extends React.Component {
    render() {
        const pad = {padding: 15};
        return (
            <Container>
                <h1>Resources</h1>\
                <Row md={8} xs={12} style={pad}>
                <h3>Notes</h3>
                <Container>
                    <ol>
                        {resources.notes.map((item)=> {
                            return <li><a href={item.link}> {item.text} </a></li>
                        })}
                    </ol>
                </Container>
                </Row>
                <Row md={8} xs={12} style={pad}>
                <h3>Published Open-source Projects</h3>
                <Container>
                    <ol>
                        {resources.oss.map((item)=> {
                            return <li><a href={item.link}> {item.text} </a></li>
                        })}
                    </ol>
                </Container>
                </Row>
                <Row md={8} xs={12} style={pad}>
                <h3>Published Open-source Datasets</h3>
                <Container>
                    <ol>
                        {resources.datasets.map((item)=> {
                            return <li><a href={item.link}> {item.text} </a></li>
                        })}
                    </ol>
                </Container>
                </Row>
            </Container>
        );
    }
}

export default Resources;