import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as JsonPatch from 'fast-json-patch';
import * as actions from '../../store/actions/inventory'

import DataGrid from '../../components/Table/DataGrid/DataGrid';
import PieChart from '../../components/Charts/PieChart';
import Alert from '../../components/Alert/Alert';
import * as GridColumns from '../../components/Table/GridColumns/GridColumns';
import WithGridFunction from '../../hoc/WithGridFunction/WithGridFunction';
import EmptyRow from '../../components/Table/GridRows/GridRow';
import InventoryPanelGroup from '../../components/Panel/InventoryPanelGroup';
import LineChart from '../../components/Charts/LineChart';


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

        inventoryData: [],
        origInventoryData: []
    };

    componentDidMount() {
        this.props.onFetchInventoryData();
    }

    componentDidUpdate(prevProps) {
        // For the initial load.
        if(this.props.inventoryData !== prevProps.inventoryData) {
            const gridData = this.props.inventoryData;
            this.setState({
                inventoryData: JSON.parse(JSON.stringify(gridData)),
                origInventoryData: JSON.parse(JSON.stringify(gridData))
            })
            // Assign data to HOC state.
            this.props.setData(gridData);
        }
        // When add or remove data from grid, we want to assign new data to the state.
        // The this.props.data is from HOC.
        if(this.props.data !== prevProps.data){
            this.setState({
                inventoryData: JSON.parse(JSON.stringify(this.props.data))
            })
        }
    }

    onSaveInventoryData = () => {
        const patchDoc = JsonPatch.compare(this.state.origInventoryData, this.state.inventoryData);
        this.props.onSaveInventoryData(patchDoc, this.state.inventoryData);
        this.setState({origInventoryData: JSON.parse(JSON.stringify(this.state.inventoryData))});
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
        // Avoid exception! We don't want to modify an empty array.
        if(this.state.inventoryData.length !== 0) {
            return (
                <div
                    style={{ backgroundColor: "#fafafa" }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                        const data = [...this.state.inventoryData];
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ inventoryData: data });
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.state.inventoryData[cellInfo.index][cellInfo.column.id]
                    }}
                />
            );
        }
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
                <InventoryPanelGroup />
                <Row className="show-grid">
                    <Col md={6} lg={4}>
                        <PieChart 
                            bsStyle='primary'
                            title='Category'
                            width={800}
                            height={300}
                            cx={220}
                            cy={100}
                            outerRadius={130}
                            fill='#8884d8'
                            displayKey='category'
                            displayValue='totalCost'
                            displayData={this.props.inventoryData}
                        />
                    </Col>
                    <Col md={6} lg={8}>
                        <LineChart 
                            data={this.state.saleAndProfit}
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
                            //The key uses to notify the child component to re-render.
                            key={this.state.inventoryData}
                            data={this.state.inventoryData} 
                            emptyRow={EmptyRow('INVENTORY')}
                            title='Inventory'
                            columns={GridColumns.INVENTORY_COLUMNS(this.onInventoryRenderEditableCellHandler)}
                            onSaveHandler={this.onSaveInventoryData}
                            checkboxProps={this.props.checkboxProps}
                            disableDeleteButton={this.props.disableDeleteButton}
                            onDeleteRowHandler={this.props.onDeleteRowHandler}
                            onAddRowHandler={this.props.onAddRowHandler}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inventoryData: state.inventory.inventoryData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchInventoryData: () => dispatch(actions.fetchInventoryData()),
        onSaveInventoryData: (patchDoc, inventoryData) => dispatch(actions.saveInventoryData(patchDoc, inventoryData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithGridFunction(Inventory));