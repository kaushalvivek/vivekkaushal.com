import React from 'react';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import nonFiction from '../../static/nonFiction.json'

class Recommendations extends React.Component {
    render() {
        const pad = { padding: 15, fontSize:20};
        return (
            <Container>

                <Row>
                    <Col md={4} xs={12} style={pad}>
                        <h3>Music</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/2sEHT1g54v4rZasIq8FdYW" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/5iEBw2W5uOJTne77oxy4GG" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/2yuHyau9urSMg8bPUNx4TE" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/5KXbTYRxK0owb1vgbPAVWr" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/38zqrWTnsWSv6wSsMc8XOR" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8} xs={12} style={pad}>
                        <h3>Non-Fiction</h3>
                        <ol>
                            <Row>
                                <Col md={6} xs={12} style={pad}>
                                    <ListGroup variant="flush">
                                        {nonFiction["col1"].map((item) => {
                                            return <ListGroup.Item>
                                                <li>{item.book} - {item.author}</li>
                                            </ListGroup.Item>
                                        })}
                                    </ListGroup>
                                </Col>
                                <Col md={6} xs={12} style={pad}>
                                    <ListGroup variant="flush">
                                        {nonFiction["col2"].map((item) => {
                                            return <ListGroup.Item>
                                                <li>{item.book} - {item.author}</li>
                                            </ListGroup.Item>
                                        })}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </ol>
                    </Col>
                </Row >

                <Row>
                    <Col md={3} xs={12} style={pad}>
                        <h3>Food</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item><a href="https://www.zomato.com/hyderabad/bawarchi-rtc-x-roads" target="_blank" rel="noreferrer">
                                Authentic Hyderabadi Biryani </a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.facebook.com/enjoyshabushabu/" target="_blank" rel="noreferrer">
                                Chinese Hot Pot</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.zomato.com/ncr/saravana-bhavan-connaught-place-new-delhi" target="_blank" rel="noreferrer">
                                Ghee Paper Roast Masala Dosa</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://motimahal.in/" target="_blank" rel="noreferrer">
                                Butter Chicken and Garlic Naan</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.zomato.com/goa/burger-factory-anjuna" target="_blank" rel="noreferrer">
                                Blue Cheese, Bacon and Avocado Burger</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.zomato.com/ncr/the-big-chill-cafe-connaught-place-new-delhi" target="_blank" rel="noreferrer">
                                New York Cheesecake</a></ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3} xs={12} style={pad}>
                        <h3>Movies</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Spotlight</ListGroup.Item>
                            <ListGroup.Item>Almost Famous</ListGroup.Item>
                            <ListGroup.Item>Before Sunrise</ListGroup.Item>
                            <ListGroup.Item>Fight Club</ListGroup.Item>
                            <ListGroup.Item>Schindler's List</ListGroup.Item>
                            <ListGroup.Item>Your Name</ListGroup.Item>
                            <ListGroup.Item>Joker</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3} xs={12} style={pad}>
                        <h3>TV Shows</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item>BoJack Horseman</ListGroup.Item>
                            <ListGroup.Item>Narcos</ListGroup.Item>
                            <ListGroup.Item>Breaking Bad</ListGroup.Item>
                            <ListGroup.Item>Rick & Morty</ListGroup.Item>
                            <ListGroup.Item>Avatar: The Last Airbender</ListGroup.Item>
                            <ListGroup.Item>Death Note</ListGroup.Item>
                            <ListGroup.Item>Pitchers</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3} xs={12} style={pad}>
                        <h3>Blog Posts</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item><a href="https://dilbertblog.typepad.com/the_dilbert_blog/2007/07/career-advice.html" target="_blank" rel="noreferrer">
                                Career Advice</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://typesense.org/blog/the-unreasonable-effectiveness-of-just-showing-up-everyday/" target="_blank" rel="noreferrer">
                                The Unreasonable Effectiveness of Just Showing Up Everyday</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.reddit.com/r/ExperiencedDevs/comments/nmodyl/drunk_post_things_ive_learned_as_a_sr_engineer/?utm_source=amp&utm_medium=&utm_content=post_body" target="_blank" rel="noreferrer">
                                Drunk Post : Things I've Learnt as a Sr Engineer</a></ListGroup.Item>
                            <ListGroup.Item><a href="http://paulgraham.com/think.html" target="_blank" rel="noreferrer">
                                How to Think for Yourself</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://waitbutwhy.com/2014/05/fermi-paradox.html" target="_blank" rel="noreferrer">
                                The Fermi Paradox</a></ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default Recommendations;