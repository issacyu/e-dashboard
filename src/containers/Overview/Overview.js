import React, { Component } from 'react';

import Card from '../../components/Card/Card';
import { Row, Col, Panel } from 'react-bootstrap';

import BarChart from '../../components/Charts/BarChart';
import ComposedChart from '../../components/Charts/ComposedChart';
import PieChart from '../../components/Charts/PieChart';
import DataGrid from '../../components/Table/DataGrid/DataGrid';
import InventoryColumns from '../../components/Table/GridColumns/InventoryColumns';

class Overview extends Component {

    state = {
        salesData:
        [
            {
                product: 'iPhone Xs',
                quantity: 10,
                price: 1300,
                category: 'electronic',
                model: '128gb',
                type: '',
                color: 'gold',
                condition: 'new',
                manufacturer: 'Apple',
                cost: 1200,
                totalCost: 1200
            },
            {
                product: 'iPhone Xs',
                quantity: 5,
                price: 1300,
                category: 'electronic',
                model: '128gb',
                type: '',
                color: 'gold',
                condition: 'new',
                manufacturer: 'Apple',
                cost: 1200,
                totalCost: 1200
            },
            {
                product: 'Samsung Galaxy Note 10',
                quantity: 5,
                price: 799,
                category: 'electronic',
                model: '128gb',
                type: '',
                color: 'Black',
                condition: 'new',
                manufacturer: 'Samsung',
                cost: 500,
                totalCost: 560
            },
            {
                product: 'LED Bulb',
                quantity: 1000,
                price: 9.99,
                category: 'home',
                model: '100 Watt',
                type: 'LED',
                color: 'Warm White',
                condition: 'new',
                manufacturer: 'Mr.LED',
                cost: 500,
                totalCost: 700
            },
        ]
    }

    onSalesRenderEditableCellHandler = (cellInfo) =>{
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.salesData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.salesData[cellInfo.index][cellInfo.column.id]
                }}
          />
        );
    }

    render(){
        return(
            <div>
                <Row className="show-grid text-center">
                    <Card title='SALES: $71365.98' />
                    <Card title='RENVENUE: $45265.28' />
                    <Card title='ORDER: 64031' />
                    <Card title='RETURN: 235' />
                </Row>
                <Row md={12} lg={12}>
                    <ComposedChart />
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
                <Row>
                    <DataGrid 
                        data={this.state.salesData}
                        columns={InventoryColumns(this.onSalesRenderEditableCellHandler)}/>
                </Row>
            </div>
        )
    }
}

export default Overview;