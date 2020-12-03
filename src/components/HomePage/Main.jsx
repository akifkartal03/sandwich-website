
import React, { useState, useEffect } from 'react';
import Recipies from './Recipies';
import { Button, Container, Jumbotron, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import {Link} from 'react-router-dom'

const Main = () => {
    const [user_input, setInput] = useState("");
    const onChange = e => {
        setInput(e)
    };
    console.log(user_input)
    return (
        <main role="main">
            <Jumbotron className="text-center">
                <Container>
                    <h1 className="jumbotron-heading">Sandwich Search </h1>
                    <p className="lead text-muted">
                        Enter ingredients you want to search for
                    </p>
                    <p>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><Button tag = {Link} to={`/allrecipespage/${user_input}`}>Search</Button></InputGroupAddon>
                            <Input onChange={(e) => onChange(`${e.target.value}`)} />
                        </InputGroup>
                        {/* <Button color="primary" className="mx-1 my-2">
                            Main call to action
                        </Button>
                        <Button color="secondary" className="my-2">
                            Secondary action
                        </Button> */}
                    </p>
                </Container>
            </Jumbotron>
            <Recipies />
        </main>
    );
};

export default Main;
