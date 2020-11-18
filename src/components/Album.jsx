import React from 'react';
import {
    Button,
    // ButtonGroup,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Row
} from 'reactstrap';

const Album = ({ album }) => {
    return (
        <div className="album py-5 bg-light">
            <Container>
                <Row>
                    {album.map((item, key) => {
                        return (
                            <Col md="4" key={key}>
                                <Card className="mb-4 box-shadow">
                                    <CardImg
                                        top
                                        width="100%"
                                        src={item.src}
                                        alt={item.altText}
                                    />
                                    <CardBody>
                                        {/*THERE WILL AN item OBJECT IN DATABASE AND IT WILL BE PRINTED IN HERE*/}
                                        <CardText>{item.description}</CardText>
                                        
                                        <div className="d-flex justify-content-between align-items-center">
                                                <a href="https://www.google.com">
                                                    <Button
                                                    outline
                                                    color="secondary"
                                                    size="sm"
                                                >
                                                    Cook Now!
                                                </Button>
                                                </a> 
                                            {/* <ButtonGroup>
                                                <Button
                                                    outline
                                                    color="secondary"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    outline
                                                    color="secondary"
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </ButtonGroup>
                                             */}
                                            
                                            
                                            
{/*                                             
                                            <small className="text-muted">
                                                {item.time}
                                            </small> */}


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

export default Album;
