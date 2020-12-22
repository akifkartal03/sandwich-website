import React, { useState } from 'react';
import './Search.css';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Container,
    Jumbotron,
    InputGroup,
    InputGroupAddon,
    Input
} from 'reactstrap';
import { Link as RRLink } from 'react-router-dom';

const SearchBar = () => {
    const [user_input, setInput] = useState('');
    let history = useHistory();
    const onChange = e => {
        setInput(e);
    };
    const handleKeyPress = target => {
        if (target.charCode === 13) {
            history.push(`/search/${user_input}`);
        }
    };
    return (
        <div className="container">
            <main role="main">
<<<<<<< HEAD:src/components/Search/SearchBar.jsx
                <Jumbotron className="text-center" id="jumbotron">
=======
                <Jumbotron className="text-center">
>>>>>>> 6cf2807a43985db240ee7edba131290cc7a0555c:client/src/components/Search/SearchBar.jsx
                    <Container>
                        <h1 className="jumbotron-heading">Sandwich Search </h1>
                        <p className="lead text-muted">
                            Enter ingredients by separating with comma you want
                            to search for
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
                                    placeholder="e.g. Sugar,Salt,Water,Tomato"
                                    onChange={e =>
                                        onChange(`${e.target.value}`)
                                    }
                                    onKeyPress={handleKeyPress}
                                />
                            </InputGroup>
                        </div>
                    </Container>
                    <br />
                    <br />
                    <h2
                        className="head"
                        style={{
                            textAlign: 'left',
                            color: '#af1507',
                            fontWeight: 'bolder'
                        }}
                    >
                        Search Results{' '}
                    </h2>
                </Jumbotron>
            </main>
        </div>
    );
};

export default SearchBar;
