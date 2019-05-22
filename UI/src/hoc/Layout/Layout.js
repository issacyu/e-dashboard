import React, { Component } from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import SideNav from '../../components/Navigation/SideNav/SideNav';
import { Grid, Col } from 'react-bootstrap';

import './Layout.css';

class Layout extends Component {
    render() {
        return (
            <div className='GridBackground'>
                <Navbar />
                <SideNav />
                <Grid fluid={true} className='GridBody'>                   
                    <main>
                        <Col md={9} lg={9} mdOffset={2} lgOffset={2}>
                            <Grid fluid={true}>
                                {this.props.children}
                            </Grid>
                        </Col>
                    </main>
                </Grid>
            </div>
        )
    }
}

export default Layout;