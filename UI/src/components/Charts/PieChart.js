import React from 'react';

import * as Utility from './Utilities';
import {
    PieChart, 
    Pie, 
    Legend, 
    Tooltip,
    Cell,
    ResponsiveContainer
} from 'recharts';

import {
    Panel
} from 'react-bootstrap'

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;  

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const pieChart = (props) => {
    return (
        <Panel>
            <Panel.Title style={{textAlign: 'center'}}>
                {props.title}
            </Panel.Title>
            <ResponsiveContainer width="98.8%" height={350}>
                <PieChart width={props.width} height={props.height}
                    margin={{top: 35, bottom: 5}}>
                    <Legend />
                    <Tooltip />
                    <Pie
                        data={Utility.processData(props.displayData, props.displayKey, props.displayValue)}  
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={props.outerRadius} 
                        fill={props.fill}>
                        {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
       </Panel>
    );
}

export default pieChart;