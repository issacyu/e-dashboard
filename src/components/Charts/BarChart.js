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
];

const BarCharts = (props) => {
    return (
        <Col>
            <Panel>
                <ResponsiveContainer width="98.8%" height={300}>
                    <BarChart width={props.width} height={props.height} data={data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}} layout="vertical">
                        {/* <CartesianGrid strokeDasharray="3 3"/> */}
                        <XAxis type="number"/>
                        <YAxis dataKey="name" type="category" />
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8"/>
                    </BarChart>
                </ResponsiveContainer>
            </Panel>
        </Col>
    )
};

export default BarCharts;
