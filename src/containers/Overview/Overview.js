import React, { Component } from 'react';

import Card from '../../components/Card/Card';
import { Grid, Row, Col } from 'react-bootstrap';

import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';

class Overview extends Component {

    render(){
        return(
            <>
                <Row className="show-grid text-center">
                    <Card heading='Sales'/>
                    <Card heading='Revenue'/>
                    <Card heading='Orders'/>
                    <Card heading='Fees'/>
                </Row>
                <Row md={12} lg={12}>
                    <LineChart />
                </Row>
                <Row>
                    <Col md={8} lg={8}>
                        <BarChart />
                    </Col>
                    <Col md={4} lg={4}>
                        <PieChart />
                    </Col>
                </Row>
            </>
        )
    }
}

export default Overview;