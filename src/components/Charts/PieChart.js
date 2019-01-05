import React from 'react';

import {
    PieChart, 
    Pie, 
    Legend, 
    Tooltip,
    Sector, 
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
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const pieChart = () => {
    return (
        <Panel bsStyle='primary'>
            <Panel.Heading>
                Pie Chart
            </Panel.Heading>
            <Panel.Body>
                <ResponsiveContainer width="98.8%" height={500}>
                    <PieChart width={800} height={400}
                        margin={{top: 35, bottom: 5}}>
                        <Pie
                            data={data} 
                            cx={300} 
                            cy={200} 
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={200} 
                            fill="#8884d8">
                            {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Panel.Body>
       </Panel>
    );
}

export default pieChart;