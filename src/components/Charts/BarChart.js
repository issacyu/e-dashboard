import React from 'react';

import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
    ResponsiveContainer
} from 'recharts';

import { Col, Panel } from 'react-bootstrap';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const BarCharts = (props) => {
    return (
        <Col>
            <Panel bsStyle={props.bsStyle}>
                <Panel.Heading>
                    Bar Chart
                </Panel.Heading>
                <Panel.Body>
                    <ResponsiveContainer width="98.8%" height={500}>
                        <BarChart width={props.width} height={props.height} data={data}
                            margin={{top: 35, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Panel.Body>
            </Panel>
        </Col>
    )
};

export default BarCharts;
