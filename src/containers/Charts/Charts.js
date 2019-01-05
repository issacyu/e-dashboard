import React from 'react';

import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import Card from '../../components/Card/Card';
import { Grid, Row, Col } from 'react-bootstrap';

const Charts = () => {
    return (
        <>
            <Grid fluid={true}>
                <Row className="show-grid text-center">
                    <Card heading='Sales'/>
                    <Card heading='Revenue'/>
                    <Card heading='Orders'/>
                    <Card heading='Fees'/>
                </Row>
                <Row className="show-grid text-center">
                    <Row>
                        <Col md={8} lg={8}>
                            <BarChart />
                        </Col>
                    </Row>
                </Row>
            </Grid>
            
        </>
    )
}

export default Charts;