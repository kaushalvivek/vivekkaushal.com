import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import bucketListData from '../../static/bucketList.json';

class BucketList extends React.Component {
    constructor(props) {
        super(props);
        const total = bucketListData.items.length;
        const done = bucketListData.items.filter(item => item.checked).length;
        this.state = {
            data: bucketListData.items,
            done: done,
            total: total,
        }
    }

    render() {
        const { data, done, total } = this.state;
        const pad = { padding: 15, fontSize: 18 };
        return (
            <Container>
                <Row md={8} xs={12} style={pad}>
                    <Col>
                    I was inspired by Chip Hyuen's <a href="https://huyenchip.com/list-100/" target="_blank" rel="noreferrer"> List 100</a> to create and maintain this list.
                        There is no set parameter for what a 'successful' life is, it's a very personal, perspective-driven and subjective quantification. 
                        But we really do remember life in moments, so this list is an ambitious collections of moments that I want to experience before I drop dead. 
                        The realization of your mortality makes life so much more exciting. <br/>
                        Current status : {done} / {total}
                    </Col>
                </Row>
                <Row style={pad}>
                    <Col>
                        <ol>
                            {data.map((item, index) => (
                                <li key={index}>
                                    {item.goal} {item.checked ? '✅' : ''}
                                </li>
                            ))}
                        </ol>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BucketList;
