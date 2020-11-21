import React from 'react';
import {
    Col,
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavLink,
    Row
} from 'reactstrap';

const Header = ({ collapsed, toggleNavbar, socialLinks }) => {
    return (
        <header>
            <Navbar color="dark" dark>
                <Container>
                    <Collapse isOpen={!collapsed} navbar>
                        <Row>
                            <Col sm="8" md="7" className="py-4">
                                <h4 className="text-white">Sandwich</h4>
                                <p className="text-muted">
                                    Welcome to Sandwich Recipe Website Project!
                                </p>
                            </Col>
                            <Col sm="4" md={{ offset: 1 }} className="py-4">
                                <h4 className="text-white">Contact</h4>
                                <p className="text-white">
                                    Dissapointer Group INC.
                                </p>
                            </Col>
                        </Row>
                    </Collapse>
                    <NavbarBrand
                        href="/"
                        className="d-flex align-items-center mr-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                        />
                        <a class="navbar-brand" href="#">
                            <img
                                src="https://i.ibb.co/12pWKWZ/Sandwich2.png"
                                width="70"
                                height="50"
                                class="d-inline-block align-top"
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        <NavLink style={{color: 'white'}} href="#">Home</NavLink>
                        <NavLink style={{color: 'white'}} href="#">All Recipies</NavLink>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
