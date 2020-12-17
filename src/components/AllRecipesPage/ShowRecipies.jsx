import React from 'react';
import {
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Row
} from 'reactstrap';
const Recipies = ({ recipies }) => {
    let len = 4;
    if (recipies && recipies.length === 1 && recipies[0]._id === '5fb967aed21567abd722a076')
        len = 14;
    return (
        <div className="container">
            <Container>
                <Row className="row">
                    {recipies.map((recipie, index) => {
                        return (
                            <Col md={len} key={index}>
                                <Card className="mb-4 box-shadow">
                                    <CardImg
                                        top
                                        width="180"
                                        height="250"
                                        src={recipie.imgURL}
                                    />
                                    <CardBody className="text-center">
                                        {/*THERE WILL AN item OBJECT IN DATABASE AND IT WILL BE PRINTED IN HERE*/}
                                        <CardText className="cardText">
                                            <strong className="strong">
                                                {recipie.name}
                                            </strong>
                                        </CardText>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button
                                                className="showButton"
                                                href={`/recipe/${recipie._id}`}
                                                variant="outline-dark"
                                                color="secondary"
                                                size="lg"
                                                block
                                            >
                                                <strong>Show</strong>
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Recipies;
