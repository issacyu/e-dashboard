import React from 'react';

import {
          Navbar,
          Nav,
          NavItem,
          Glyphicon
     } from 'react-bootstrap';

const navBar = () => {
    return (
        <div>
          <Navbar inverse fluid={true}>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={0} onClick={ () => this.onToggleSidebar() }>
                  <Glyphicon glyph="align-justify" />
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </div>
    );
  };

export default navBar;