import React, { Component } from 'react';

import Navbar from '../../containers/Navigation/Navbar/Navbar';

import { Grid, Row, Col } from 'react-bootstrap';

class Layout extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Grid fluid={true}>
                    
                    <Col md={1} lg={1}>

                    </Col>

                    <main>
                        <Col md={9} lg={9} mdOffset={1} lgOffset={1}>
                            {this.props.children}
                        </Col>
                    </main>
                </Grid>
            </>
        )
    }
}

export default Layout;