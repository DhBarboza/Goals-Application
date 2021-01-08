import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">GOALS</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink href="/">Metas</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/cadastrar/">Cadastrar</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/DhBarboza/Goals-Application">GitHub</NavLink>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>
    );
};

export default Menu;
