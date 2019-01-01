import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import {
          Navbar,
          Nav,
          NavItem,
          Glyphicon,
          Modal
     } from 'react-bootstrap';

import classes from '../Navbar/style.css';

class NavBar extends Component {
  state={
      isVisible: false
  }

  onToggleSidebar = () => {
    this.setState(prevState => {
      this.state.isVisible = !prevState.isVisible
    });
    this.forceUpdate();
  }

  render(){
    return (
        <div>

          {/* Top navigation bar. */}

          <Navbar inverse fluid={true}>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={0} onClick={ () => this.onToggleSidebar() }>
                  <Glyphicon glyph="align-justify" />
                </NavItem>
                <NavItem eventKey={1} componentClass={NavLink} href="/overview" to="/overview">
                  Overview
                </NavItem>
                <NavItem eventKey={2} componentClass={NavLink} href="/charts" to="/charts">
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
          
          {/* A sidebar like modal. */}

          <Modal className='menu-sidebar left' side='left' show={ this.state.isVisible } onHide={ () => this.onToggleSidebar() } autoFocus keyboard>
                {/* <Modal.Header closeButton>
                  <Modal.Title>Menu</Modal.Title>
                </Modal.Header> */}
                {/* <Modal.Body> */}
                  <Nav>
                    <NavItem href="#">Link 1</NavItem>
                    <NavItem href="#">Link 2</NavItem>
                    <NavItem href="#">Link 3</NavItem>
                    <NavItem href="#">Link 4</NavItem>
                  </Nav>
                {/* </Modal.Body> */}
          </Modal>
      </div>
    );
    }
};

export default NavBar;