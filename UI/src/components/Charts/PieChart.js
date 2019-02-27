import React from 'react';

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

const processData = (data, key, value) => {
    let dataClone = [...data];
    let newData = [];
    let map = new Map();

    dataClone.forEach(x => {
        if(map.has(x[key])) {
            const val = map.get(x[key]) + x[value];
            map.set(x[key], val);
        }
        else{
            map.set(x[key], x[value]);
        }
    });

    map.forEach((v, k) => {
        const obj = {
            name: k,
            value: v
        }
        newData.push(obj);
    });
    return newData;
}

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
            <ResponsiveContainer width="98.8%" height={300}>
                <PieChart width={props.width} height={props.height}
                    margin={{top: 35, bottom: 5}}>
                    <Legend />
                    <Tooltip />
                    <Pie
                        data={processData(props.displayData, props.displayKey, props.displayValue)} 
                        cx={props.cx} 
                        cy={props.cy} 
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