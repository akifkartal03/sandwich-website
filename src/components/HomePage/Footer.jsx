import React from 'react';
import { Container } from 'reactstrap';

const Footer = (props) => {
    return (
        <footer className="text-muted">
            <Container>
                <p className="float-right">
                    <a href="/">Back to top</a>
                </p>
                <p>Copyright to &copy; Sandwich</p>
                <p>
                    Project's Github available on: 
                    <a href="https://github.com/akifkartal03/sandwich-recipe-app">
                         Visit our github page
                    </a>
                    .
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
