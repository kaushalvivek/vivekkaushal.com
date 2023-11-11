import React from 'react';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import nonFiction from '../../static/nonFiction.json';
import '../../styles/recommendations.css'; // Assuming this CSS file exists

class Recommendations extends React.Component {
    render() {
        return (
            <Container className="recommendations-container">
                <Row>
                    <Col md={4} xs={12} className="music-section">
                        <h3>Music</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/2sEHT1g54v4rZasIq8FdYW" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/5iEBw2W5uOJTne77oxy4GG" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/2yuHyau9urSMg8bPUNx4TE" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                            <ListGroup.Item><iframe src="https://open.spotify.com/embed/playlist/38zqrWTnsWSv6wSsMc8XOR" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8} xs={12} className="non-fiction-section">
                        <h3>Non-Fiction</h3>
                        <Row>
                            <Col md={6} xs={12}>
                                <ListGroup variant="flush">
                                    {nonFiction["col1"].map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            {item.book}, {item.author}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={6} xs={12}>
                                <ListGroup variant="flush">
                                    {nonFiction["col2"].map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            {item.book}, {item.author}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="bottom-sections">
                    <Col md={4} xs={12} className="food-section">
                        <h3>Food</h3>
                        <ListGroup.Item><a href="https://www.zomato.com/hyderabad/bawarchi-rtc-x-roads" target="_blank" rel="noreferrer">
                            Authentic Hyderabadi Biryani </a></ListGroup.Item>
                        <ListGroup.Item><a href="https://motimahal.in/" target="_blank" rel="noreferrer">
                            Butter Chicken and Garlic Naan</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://www.zomato.com/goa/burger-factory-anjuna" target="_blank" rel="noreferrer">
                            Blue Cheese, Bacon and Avocado Burger</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://www.zomato.com/ncr/the-big-chill-cafe-connaught-place-new-delhi" target="_blank" rel="noreferrer">
                            New York Cheesecake</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://www.zomato.com/mangalore/maharaja-restaurant-balmatta-delhi" target="_blank" rel="noreferrer">
                            Mangalorean Ghee Roast Chicken and Neer Dosa</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://www.zomato.com/mangalore/giri-manjas-bhavathi" target="_blank" rel="noreferrer">
                            Anjal Tawa Fry</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://www.zomato.com/bangalore/a2b-adyar-ananda-bhavan-marathahalli-bangalore" target="_blank" rel="noreferrer">
                            Ghee Roast Dosa</a></ListGroup.Item>
                    </Col>
                    <Col md={4} xs={12} className="movies-shows-section">
                        <h3>Movies and Shows</h3>
                        <ListGroup.Item>The Bear</ListGroup.Item>
                        <ListGroup.Item>BoJack Horseman</ListGroup.Item>
                        <ListGroup.Item>Almost Famous</ListGroup.Item>
                        <ListGroup.Item>Before Sunrise</ListGroup.Item>
                        <ListGroup.Item>Breaking Bad</ListGroup.Item>
                        <ListGroup.Item>Schindler's List</ListGroup.Item>
                        <ListGroup.Item>Your Name</ListGroup.Item>
                    </Col>
                    <Col md={4} xs={12} className="podcasts-section">
                        <h3>Podcasts</h3>
                        <ListGroup.Item><a href="https://open.spotify.com/show/2dR1MUZEHCOnz1LVfNac0j?si=7d7f1e207fa74063">Lenny's Podcast</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://lexfridman.com/podcast/">Lex Fridman Podcast</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://open.spotify.com/show/1VyK52NSZHaDKeMJzT4TSM?si=15912f00fb874019">The Knowledge Project</a></ListGroup.Item>
                        <ListGroup.Item><a href="https://open.spotify.com/show/02fM1JHpt9HmHGp482K71b?si=d27fba75fbf14a09">Developer Tea</a></ListGroup.Item>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Recommendations;
