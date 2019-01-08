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
                    <LineChart
                        width={600}
                        height={300} 
                        bsStyle='primary'
                    />
                </Row>
                <Row>
                    <Col md={8} lg={8}>
                        <BarChart 
                            width={600}
                            height={300}
                            bsStyle='primary'
                        />
                    </Col>
                    <Col md={4} lg={4}>
                        <PieChart 
                            bsStyle='primary'
                            width={800}
                            height={400}
                            cx={300}
                            cy={200}
                            outerRadius={200}
                            fill='#8884d8'
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

export default Overview;