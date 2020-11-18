import React from 'react';
import Album from './Album';
import { Button, Container, Jumbotron, InputGroup, InputGroupAddon, Input } from 'reactstrap';

const Main = ({ album }) => {
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
                            <InputGroupAddon addonType="prepend"><Button>Search</Button></InputGroupAddon>
                            <Input />
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
            <Album album={album} />
        </main>
    );
};

export default Main;
