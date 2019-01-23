import React, { Component } from 'react';

import { Row, Col } from 'react-bootstrap';

import DataGrid from '../../components/Table/DataGrid/DataGrid';
import PieChart from '../../components/Charts/PieChart';
import Alert from '../../components/Alert/Alert';
import ManufacturerColumns from '../../components/Table/GridColumns/ManufacturerColumn';
import InventoryColumns from '../../components/Table/GridColumns/InventoryColumns';
import EmptyRow from '../../components/Table/GridRows/GridRow';

class Inventory extends Component {

    state = {
        manufacturerData: 
        [
            {
                manufacturer: 'Apple',
                name: 'Steve Job',
                phone: '123-456-7890',
                email: '123@gmail.com',
                address: '123th St New York NY 10012'
            },
            {
                manufacturer: 'Apple',
                name: 'Steve Job',
                phone: '123-456-7890',
                email: '123@gmail.com',
                address: '123th St New York NY 10012'
            },
            {
                manufacturer: 'Apple',
                name: 'Steve Job',
                phone: '123-456-7890',
                email: '123@gmail.com',
                address: '123th St New York NY 10012'
            }
        ],

        inventoryData:
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
                product: 'LED Bulb',
                quantity: 1,
                price: 9.99,
                category: 'home',
                model: '100 Watt',
                type: 'LED',
                color: 'Warm White',
                condition: 'new',
                manufacturer: 'Mr.LED',
                cost: 2,
                totalCost: 2.25
            },
        ]
    };

    onManufacturerRenderEditableCellHandler = (cellInfo) =>{
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.manufacturerData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ manufacturerData: [...data] });
                }}                
                dangerouslySetInnerHTML={{
                    __html: this.state.manufacturerData[cellInfo.index][cellInfo.column.id]
                }}
          />
        )
    };

    onInventoryRenderEditableCellHandler = (cellInfo) =>{
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.inventoryData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.inventoryData[cellInfo.index][cellInfo.column.id]
                }}
          />
        )
    };

    render(){
        let alert;
        const lowStockItem = this.state.inventoryData.filter(i => i.quantity < 10)
        if(lowStockItem.length > 0) {
            alert = 
                <Row>
                    <Alert title='Low Stock Warning' messages={lowStockItem.map(i => i.product)}/>
                </Row>
        }

        return(
            <>            
            {alert}
            <Row>
                <Col md={8} lg={8}>
                    <DataGrid 
                        data={this.state.manufacturerData} 
                        title='Manufacturer'
                        clicked={() => this.onSaveDataGridHandler()}
                        columns={ManufacturerColumns(this.onManufacturerRenderEditableCellHandler)}
                        emptyRow={EmptyRow('MANUFACTURER')}
                    />
                </Col>

                <Col md={4} lg={4}>
                    <PieChart 
                        bsStyle='primary'
                        heading='Category'
                        width={800}
                        height={400}
                        cx={300}
                        cy={200}
                        outerRadius={200}
                        fill='#8884d8'
                        displayKey='category'
                        displayValue='quantity'
                        displayData={this.state.inventoryData}
                    />
                </Col>
            </Row>

            <Row>
                <DataGrid data={this.state.inventoryData} 
                    title='Inventory'
                    columns={InventoryColumns(this.onInventoryRenderEditableCellHandler)}
                />
            </Row>
            </>
        )
    }
}

export default Inventory;