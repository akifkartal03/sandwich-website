import React, { useState } from 'react';
import {
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Jumbotron,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import { Link as RRLink } from 'react-router-dom';

const Search = ({ recipes, param }) => {
    const [user_input, setInput] = useState('');

    const onChange = e => {
        setInput(e);
    };

    var results = [];
    var searchList = param.toLowerCase().split(',');

    for (var i = 0; i < searchList.length; i++) {
        searchList[i] = searchList[i].replace(/%20/g, " ").trim();
        searchList[i] = searchList[i].replace(/(^\w{1})|(\s+\w{1})/g, letter =>
            letter.toUpperCase()
        );
    }
    console.log("list:" + searchList);

    recipes.forEach(element => {
        if (searchList.every(val => element.ingredients.includes(val))) {
            results.push(element);
        }
    });

    return (
        <div className="App">
            <Jumbotron className="text-center">
                <Container>
                    <h1 className="jumbotron-heading">Sandwich Search </h1>
                    <p className="lead text-muted">
                        Enter ingredients you want to search for
                    </p>
                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <Button
                                    tag={RRLink}
                                    to={`/search/${user_input}`}
                                >
                                    Search
                                </Button>
                            </InputGroupAddon>
                            <Input
                                onChange={e => onChange(`${e.target.value}`)}
                            />
                        </InputGroup>
                        {/* <Button color="primary" className="mx-1 my-2">
                        Main call to action
                    </Button>
                    <Button color="secondary" className="my-2">
                        Secondary action
                    </Button> */}
                    </div>
                </Container>
            </Jumbotron>
            <Container>
                {results.map((recipe, index) => {
                    return (
                        <Col md="4" key={index}>
                            <Card className="mb-4 box-shadow">
                                <CardImg
                                    top
                                    width="180"
                                    height="250"
                                    src={recipe.imgURL}
                                />
                                <CardBody className="text-center">
                                    {/*THERE WILL AN item OBJECT IN DATABASE AND IT WILL BE PRINTED IN HERE*/}
                                    <CardText>
                                        <strong>{recipe.name}</strong>
                                    </CardText>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <Button
                                            href={`/recipe/${recipe._id}`}
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
            </Container>
        </div>
    );
};

export default Search;
