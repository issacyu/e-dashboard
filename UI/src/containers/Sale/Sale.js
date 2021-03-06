import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as JsonPatch from 'fast-json-patch';
import * as actions from '../../store/actions/sale'
import { Row, Col } from 'react-bootstrap';

import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';
import DataGrid from '../../components/Table/DataGrid/DataGrid';
import * as GridColumns from '../../components/Table/GridColumns/GridColumns';
import WithGridFunction from '../../hoc/WithGridFunction/WithGridFunction';
import EmptyRow from '../../components/Table/GridRows/GridRow';
import * as Analysis from './Utilities/SaleAnalysis';
import SalePanelGroup from '../../components/Panel/SalePanelGroup';
import Spinner from '../../components/UI/Spinner/Spinner';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Sale extends Component {

    state = {
        salesData: [],
        origSalesData: []
    }

    componentDidMount() {
        this.props.onFetchSaleData();
    }
    
    componentDidUpdate(prevProps) {
        // For the initial load.
        if(this.props.saleData !== prevProps.saleData) {
            const gridData = this.props.saleData;
            this.setState({
                salesData: JSON.parse(JSON.stringify(gridData)),
                origSalesData: JSON.parse(JSON.stringify(gridData))
            })
            // Assign data to HOC state.
            this.props.setData(gridData);
        }
        // When add or remove data from grid, we want to assign new data to the state.
        // The this.props.data is from HOC.
        if(this.props.data !== prevProps.data){
            this.setState({
                salesData: JSON.parse(JSON.stringify(this.props.data))
            })
        }
    }

    onSalesRenderEditableCellHandler = (cellInfo) => {
        // Avoid exception! We don't want to modify an empty array.
        if(this.state.salesData.length !== 0) {
            return (
                <div
                    style={{ backgroundColor: "#fafafa" }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                        const data = [...this.state.salesData];
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({salesData: data});
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.state.salesData[cellInfo.index][cellInfo.column.id]
                    }}
                />
            );
        }
    }

    onSaveSaleHandler = () => {
        const patchDoc = JsonPatch.compare(this.state.origSalesData, this.state.salesData);
        this.props.onSaveSaleData(patchDoc, this.state.salesData);
        this.setState({origSalesData: JSON.parse(JSON.stringify(this.state.salesData))});
        if(this.props.error === ''){
            this.props.toggleModal('Success', 'Sales are saved successfully.', 'success');
        }  
        else{
            this.props.toggleModal('Fail', 'Sales cannot be saved. ' + this.props.error, 'danger');
        }      
    }

    render(){
        const topFiveProduct = Analysis.getTopFiveProducts(this.props.saleData, 'product', 'quantity');
        const completedReturnedRatio = Analysis.getOrderStatus(this.props.saleData);
        const saleProfitByDate = Analysis.getSaleAndProfitByDate(this.props.saleData);
        const totalSale = Analysis.getTotalSale(this.props.saleData);
        const totalProfit = Analysis.getTotalProfit(this.props.saleData);
        const totalOrder = Analysis.getTotalOrder(this.props.saleData);
        const totalReturn = Analysis.getTotalReturn(this.props.saleData);

        let sale = <Spinner />;
        if(!this.props.loading) {
            sale = <Wrapper>
                        <SalePanelGroup
                            totalSale={totalSale}
                            totalProfit={totalProfit}
                            totalOrder={totalOrder}
                            totalReturn={totalReturn}
                        />
                        <Row className="show-grid">
                            <Col md={12} lg={12}>
                                <LineChart data={saleProfitByDate} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={4}>
                                <BarChart 
                                    title='Top 5 Selling Products'
                                    width={600}
                                    height={300}
                                    data={topFiveProduct}
                                    displayKey='product'
                                    displayValue='quantity'
                                />
                            </Col>
                            <Col md={12} lg={4}>
                                <PieChart 
                                    title='Profit vs Cost'
                                    displayData={this.state.mockData}
                                    displayKey='product'
                                    displayValue='totalCost'
                                    width={800}
                                    height={300}
                                    cx={220}
                                    cy={100}
                                    outerRadius={130}
                                    fill='#8884d8'
                                />
                            </Col>
                            <Col md={12} lg={4}>
                                <PieChart 
                                    title='Complete Order vs Return Order'
                                    key={completedReturnedRatio}
                                    displayData={completedReturnedRatio}
                                    displayKey='status'
                                    displayValue='number'
                                    width={800}
                                    height={300}
                                    cx={220}
                                    cy={100}
                                    outerRadius={130}
                                    fill='#8884d8'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={12}>
                                <DataGrid 
                                    //The key uses to notify the child component to re-render.
                                    data={this.state.salesData}
                                    emptyRow={EmptyRow()}
                                    columns={GridColumns.SALES_COLUMNS(this.onSalesRenderEditableCellHandler)}
                                    onSaveHandler={this.onSaveSaleHandler}
                                    checkboxProps={this.props.checkboxProps}
                                    disableDeleteButton={this.props.disableDeleteButton}
                                    onDeleteRowHandler={this.props.onDeleteRowHandler}
                                    onAddRowHandler={this.props.onAddRowHandler}
                                />
                            </Col>
                        </Row>
                   </Wrapper>
        }
        return(
            <div>
                {sale}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        saleData: state.sale.saleData,
        loading: state.sale.loading,
        error: state.sale.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSaleData: () => dispatch(actions.fetchSaleData()),
        onSaveSaleData: (patchDoc, salesData) => dispatch(actions.saveSaleData(patchDoc, salesData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithGridFunction(Sale));