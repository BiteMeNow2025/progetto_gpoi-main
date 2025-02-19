import { ForkKnife } from "lucide-react";
import { Col, Container, Row } from "react-bootstrap";

export default function Product() {
    return (
        <Container>
            <Row className="min-vh-100 d-flex flex-column-reverse flex-md-row justify-content-center align-items-center">
                <Col md={7}>
                    <div>
                        <h1>Product</h1>
                        <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptate. Dolorum fugit quod consequuntur? Dolorum aliquid voluptate quod? Voluptate.</p>
                        <Row>
                            <Col xs={2}>
                                <ForkKnife></ForkKnife>
                            </Col>
                            <Col xs={8}>
                                <h6>Allergene</h6>
                                <p>Ingredienti</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={5}>
                    <div className="ratio ratio-1x1">
                        <img className="img-fluid w-100 object-fit-cover"src="https://th.bing.com/th/id/OIP.-uHaQPhifSlHGBA5kjiIagHaE0?rs=1&pid=ImgDetMain"></img>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}