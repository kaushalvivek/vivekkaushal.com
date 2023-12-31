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
        const listItemStyle = {
            fontSize: 16,
            marginBottom: 5,
            lineHeight: '1.6em',
        };
        const completedStyle = { ...listItemStyle, color: 'green' };
        const inProgressStyle = { ...listItemStyle, color: 'orange' };

        return (
            <Container>
                <Row md={8} xs={12} style={pad}>
                    <Col>
                    I was inspired by Chip Hyuen's <a href="https://huyenchip.com/list-100/" target="_blank" rel="noreferrer"> List 100</a> to create and maintain this list.
                        This list is a collections of moments that I want to experience before I drop off the face of this planet.<br/>
                        Current status : {done} / {total}
                    </Col>
                </Row>
                <Row style={pad}>
                    <Col>
                        <ol>
                            {data.map((item, index) => (
                                <li 
                                    key={index} 
                                    style={item.checked ? completedStyle : (item.state ? inProgressStyle : listItemStyle)}
                                >
                                    {item.goal} 
                                    {item.checked && ' ✅'}
                                    {item.state && ` (${item.state})`}
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
