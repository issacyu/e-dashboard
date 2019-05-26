import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as JsonPatch from 'fast-json-patch';
import * as actions from '../../store/actions/inventory'
import * as Analysis from './Utilities/InventoryAnalysis';

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
        inventoryData: [],
        origInventoryData: [],
        categories: []
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

            this.setState({
                categories: Analysis.getCategories(gridData)
            })
        }
        // When add or remove data from grid, we want to assign new data to the state.
        // The this.props.data is from HOC.
        if(this.props.data !== prevProps.data){
            this.setState({
                inventoryData: JSON.parse(JSON.stringify(this.props.data)),
            })
        }
    }

    onSaveInventoryData = () => {
        const patchDoc = JsonPatch.compare(this.state.origInventoryData, this.state.inventoryData);
        this.props.onSaveInventoryData(patchDoc, this.state.inventoryData);
        this.setState({origInventoryData: JSON.parse(JSON.stringify(this.state.inventoryData))});
        if(this.props.error === ''){
            this.props.toggleModal('Success', 'Inventories are saved successfully.', 'success');
        }  
        else{
            this.props.toggleModal('Fail', 'Inventories cannot be saved: ' + this.props.error, 'danger');
        }  
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
                            displayValue='quantity'
                            displayData={this.state.categories}
                        />
                    </Col>
                    <Col md={6} lg={8}>
                        <LineChart 
                            data={this.state.saleAndProfit}
                        />
                    </Col>
                </Row>
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
        inventoryData: state.inventory.inventoryData,
        loading: state.inventory.loading,
        error: state.inventory.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchInventoryData: () => dispatch(actions.fetchInventoryData()),
        onSaveInventoryData: (patchDoc, inventoryData) => dispatch(actions.saveInventoryData(patchDoc, inventoryData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithGridFunction(Inventory));