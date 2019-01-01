import React from 'react';

import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import Card from '../../components/Card/Card';
import { Row, Grid } from 'react-bootstrap';

const Charts = () => {
    return (
        <>
            <Grid>
                <Row className="show-grid text-center">
                    <Card />
                    <Card />
                </Row>
                <Row className="show-grid text-center">
                    <BarChart />  
                </Row>
            </Grid>
        </>
    )
}

export default Charts;