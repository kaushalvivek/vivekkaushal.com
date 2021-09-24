import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import list from '../../static/bucketList.json'

class BucketList extends React.Component {

    render() {
        const pad = { padding: 15, fontSize: 20 };
        let total = 0, done = 0;
        list["items"].forEach((item) =>{ 
            if (item.done)
                done+=1;
            total+=1;
        })
        return (
            <Container>
                {/* <h1>Bucket List</h1> */}
                <Row md={8} xs={12} style={pad}>
                    <Col>
                        I was inspired by Chip Hyuen's <a href="https://huyenchip.com/list-100/" target="_blank" rel="noreferrer"> List 100</a> to create and maintain this list.
                        There is no set parameter for what a 'successful' life is, it's a very personal, perspective-driven and subjective quantification. 
                        But we really do remember life in moments, so this list is an ambitious collections of moments that I want to experience before I drop dead. 
                        The realization of your mortality makes life so much more exciting. This list is up to date, as of {list.lastUpdated}. <br/>
                        Current status : {done} / {total}
                    </Col>
                </Row>
                <Row style={pad}>
                    <Col>
                        <ol>
                            {list["items"].map((item) => {
                                const check = item.done ? '✅' : '⬜';
                                return <li> {check} {item.body} </li>
                            })
                            }
                        </ol>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BucketList;