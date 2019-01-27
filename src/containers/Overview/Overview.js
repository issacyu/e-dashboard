import React, { Component } from 'react';

import Card from '../../components/Card/Card';
import { Row, Col, Panel } from 'react-bootstrap';

import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';

class Overview extends Component {

    render(){
        return(
            <>
                <Row className="show-grid text-center">
                    <Card title='SALES: $71365.98' price='1000' />
                    <Card title='RENVENUE: $45265.28' price='1000' />
                    <Card title='ORDER: 64031' price='1000' />
                    <Card title='RETURN: 235' price='1000' />
                </Row>
                <Row md={12} lg={12}>
                    <LineChart
                        width={600}
                        height={300} 
                        
                    />
                </Row>
                <Row>
                    <Col md={8} lg={8}>
                        <BarChart 
                            width={600}
                            height={300}
                        />
                    </Col>
                    <Col md={4} lg={4}>
                        {/* <PieChart 
                            bsStyle='primary'
                            width={800}
                            height={400}
                            cx={300}
                            cy={200}
                            outerRadius={200}
                            fill='#8884d8'
                        /> */}
                    </Col>
                </Row>
            </>
        )
    }
}

export default Overview;