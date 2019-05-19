import React, { Component } from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import SideNav from '../../components/Navigation/SideNav/SideNav';
import { Grid, Col } from 'react-bootstrap';

class Layout extends Component {
    render() {
        return (
            <div style={{backgroundColor: 'rgb(249, 249, 250)'}}>
                <Navbar />
                <SideNav />
                <Grid fluid={true}>                   
                    <Col md={1} lg={1}>

                    </Col>

                    <main>
                        <Col md={8} lg={8} mdOffset={1} lgOffset={1}>
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