import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Panel, Table } from 'react-bootstrap';
import * as actions from '../../store/actions/inventory'

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
    };

    componentDidMount() {

    }

    onSaveInventoryData = () => {
        const newInventoryData = [...this.state.inventoryData];
        this.props.onSaveInventoryData(newInventoryData);
    }

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
                    <Col md={12} lg={12}>   
                        <Alert title='Low Stock Warning' messages={lowStockItem.map(i => i.product)}/>
                    </Col>
                </Row>
        }

        return(
            <div>    
                {alert}
                <Row className="show-grid">
                    <Col md={3} lg={3}>
                        <Panel>
                            <ul class="list-group">
                                <li class="list-group-item">Total Item Left: 200</li>
                                <li class="list-group-item">Total Value of Item: $2000</li>
                                <li class="list-group-item">Average Item cost: $45.28</li>
                                <li class="list-group-item">Number of Item: 200</li>
                            </ul>
                        </Panel>
                    </Col>
                    <Col md={3} lg={3}>
                        <PieChart 
                            bsStyle='primary'
                            heading='Cost By Category'
                            width={800}
                            height={300}
                            cx={220}
                            cy={100}
                            outerRadius={130}
                            fill='#8884d8'
                            displayKey='category'
                            displayValue='totalCost'
                            displayData={this.state.inventoryData}
                        />
                    </Col>
                    <Col md={3} lg={3}>
                        <PieChart 
                            bsStyle='primary'
                            heading='Cost By Product'
                            width={800}
                            height={300}
                            cx={220}
                            cy={100}
                            outerRadius={130}
                            fill='#8884d8'
                            displayKey='product'
                            displayValue='totalCost'
                            displayData={this.state.inventoryData}
                        />
                    </Col>
                    <Col md={3} lg={3}>
                        <PieChart 
                            bsStyle='primary'
                            heading='Category'
                            width={800}
                            height={300}
                            cx={220}
                            cy={100}
                            outerRadius={130}
                            fill='#8884d8'
                            displayKey='category'
                            displayValue='quantity'
                            displayData={this.state.inventoryData}
                        />
                    </Col>
                </Row>
                {/* <Row>
                    <Col md={12} lg={12}>
                        <DataGrid 
                            data={this.state.manufacturerData} 
                            title='Manufacturer'
                            columns={ManufacturerColumns(this.onManufacturerRenderEditableCellHandler)}
                            emptyRow={EmptyRow('MANUFACTURER')}
                        />
                    </Col>
                </Row> */}
                <Row>
                    <Col md={12} lg={12}>
                        <DataGrid 
                            data={this.state.inventoryData} 
                            title='Inventory'
                            columns={InventoryColumns(this.onInventoryRenderEditableCellHandler)}
                            onSaveHandler={this.onSaveInventoryData}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveInventoryData: (newData) => dispatch(actions.saveInventoryData(newData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);