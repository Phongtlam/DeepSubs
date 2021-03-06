import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/app.scss';

const NavBar = () => (
  <Nav bsStyle="tabs" activeKey="1">
    <LinkContainer to="/home">
      <NavItem eventKey={1}>Profile Page</NavItem>
    </LinkContainer>
    <LinkContainer to="/game">
      <NavItem eventKey={2}>Game Page</NavItem>
    </LinkContainer>
  </Nav>
);

export default NavBar;
