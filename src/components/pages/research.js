import React from 'react';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';

class Research extends React.Component {
    render() {
        const pad = { padding: 15, fontSize: 20 };
        return (
            <Container>
                <Row>
                    <Col md={8} xs={12} style={pad}>
                        <h3>Summary</h3>
                        <p>
                            I want to make technology more inclusive and technological progress more responsible by improving upon our current
                            understanding of technology's societal impact.
                        </p>
                        <p>
                            Having forayed into research at the Cognitive Sciences Lab, IIIT Hyderabad under Dr Kavita Vemuri,
                            I have worked at the intersection of human computer interaction, neuroscience and economics over the last few years.
                            My MS thesis explores the proliferation of <a href="https://en.wikipedia.org/wiki/Clickbait"><em> clickbait </em></a>
                            in news media and evaluates its impact on -- the credibility of news, and the distribution of readers' visual attention.
                        </p>

                        <p>
                            I am fortunate to have worked with people like Dr Hendrik Rommeswinkel from NTU, Taiwan and Dr Prithviraj Mukherjee from IIM, Bangalore.
                            The former was as a Research Assistant at the National Taiwan University, Taipei, exploring the impact of various demographic and macroeconomic
                            factors on the freedom of choice that consumers enjoy. While the latter was as an year long independent study focusing on
                            laboratory-based behavioral experiments involving eye-trackers.
                        </p>

                        <p>
                            I look forward to meaningful research collaborations and interesting discussions! 😄
                        </p>
                    </Col>
                    <Col md={4} xs={12} style={pad}>
                        <h3>Papers</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item><a href="https://ieeexplore.ieee.org/abstract/document/9405359" target="_blank" rel="noreferrer">
                                Clickbait-Trust and Credibility of Digital News, IEEE Transactions on Technology and Society, 2021</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://aclanthology.org/2020.icon-main.11.pdf" target="_blank" rel="noreferrer">
                                Clickbait in Hindi News Media, International Conference on Natural Language Processing (ICON'20), 2020</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.researchgate.net/profile/Vivek-Kaushal-3/publication/345156547_Investigating_Academic_Performance_and_Financial_Risk-Taking/links/5f9fa924a6fdccfd7b948b85/Investigating-Academic-Performance-and-Financial-Risk-Taking.pdf" target="_blank" rel="noreferrer">
                                Investigating Academic Performance and Financial Risk-Taking, 6th Annual Conference of the Association of Cognitive Sciences in India (ACCS'19), 2019</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.trembling-hand.com/wp-content/uploads/2021/03/measuring-consumer-freedom.pdf" target="_blank" rel="noreferrer">
                                Measuring Consumer Freedom, 2021</a> (RAship, not amounting to authorship) </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} xs={12} style={pad}>
                        <h3>Conferences</h3>
                        <ol>
                            <li>International Conference on Natural Language Processing (ICON'20), IIT Patna, 2020 - Paper</li>
                            <li>IEEE International Symposium on Technology and Society (IEEE ISTAS'20), 2020 - Extended Abstract</li>
                            <li>6th Annual Conference of the Association for Cognitive Sciences in India, 2019 - Poster</li>
                            <li>Foundation of Utility and Risk Conference, University of York, UK, 2018 - Poster</li>
                        </ol>
                    </Col>
                    <Col md={4} xs={12} style={pad}>
                        <h3>Links</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item><a href="https://drive.google.com/file/d/1Y0A-_eBY-tySBg82vUveCIcCU8T3-LXx/view?usp=sharing" target="_blank" rel="noreferrer">
                                Research Resume</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://scholar.google.co.in/citations?user=juZg-YcAAAAJ&hl=en" target="_blank" rel="noreferrer">
                                Google Scholar</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://www.researchgate.net/profile/Vivek-Kaushal-3" target="_blank" rel="noreferrer">
                                ResearchGate</a></ListGroup.Item>
                            <ListGroup.Item><a href="https://kaggle.com/kaushalvivek/datasets" target="_blank" rel="noreferrer">
                                Published Datasets</a></ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Research;