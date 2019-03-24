import React from 'react';

import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend,
    ResponsiveContainer
} from 'recharts';

import { Col, Panel } from 'react-bootstrap';

const BarCharts = (props) => {
    return (
        <Col>
            <Panel>
                <ResponsiveContainer width="98.8%" height={300}>
                    <BarChart width={props.width} height={props.height} data={props.data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}} layout="vertical">
                        <XAxis type="number"/>
                        <YAxis dataKey={props.displayKey} type="category" />
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey={props.displayValue} fill="#8884d8"/>
                    </BarChart>
                </ResponsiveContainer>
            </Panel>
        </Col>
    )
};

export default BarCharts;
