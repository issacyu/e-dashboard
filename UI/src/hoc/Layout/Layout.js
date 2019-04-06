import React, { Component } from 'react';

import Navbar from '../../containers/Navigation/Navbar/Navbar';

import { Grid, Row, Col } from 'react-bootstrap';

class Layout extends Component {
    render() {
        return (
            <div style={{backgroundColor: 'rgb(249, 249, 250)'}}>
                <Navbar />
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