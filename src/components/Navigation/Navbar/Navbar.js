import React from 'react';
import { NavLink } from 'react-router-dom';

import {
          Navbar,
          Nav,
          NavItem,
     } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#brand">Simple Dashboard</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} componentClass={NavLink} href="/overview" to="/overview">
                  Overview
                </NavItem>
                <NavItem eventKey={2} href="#">
                  Charts
                </NavItem>
                <NavItem eventKey={2} componentClass={NavLink} href="/inventory" to="/inventory">
                  Inventory
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">
                  Link Right
                </NavItem>
                <NavItem eventKey={2} href="#">
                  Link Right
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </div>
    );
};

export default NavBar;