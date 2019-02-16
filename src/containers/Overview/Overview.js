import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios/AxiosConfig';
import * as actions from '../../store/actions/overview'

import Card from '../../components/Card/Card';
import { Row, Col, Panel } from 'react-bootstrap';

import BarChart from '../../components/Charts/BarChart';
import ComposedChart from '../../components/Charts/ComposedChart';
import PieChart from '../../components/Charts/PieChart';
import DataGrid from '../../components/Table/DataGrid/DataGrid';
import salesTrackerColumns from '../../components/Table/GridColumns/SalesTrackerColumns';

class Overview extends Component {

    state = {
        salesData:
        [
            {
                dateSold: '2/2/2019',
                itemName: 'iPhone Xs',
                quantity: 1,
                soldPrice: 1500,
                shippingCharged: 0,
                shippingAndHandlingFee: 25,
                ebayFee: 120,
                paypalFee: 100,
                otherFee: 0,
                costPerItem: 1200,
                totalCost: 1420,
                netProfit: 80
            }
        ]
    }

    componentDidMount() {
        this.props.onFetchOverviewData();
        // const sales = {
        //     dateSold: '2/2/2019',
        //     itemName: 'iPhone Xs',
        //     quantity: 1,
        //     soldPrice: 1500,
        //     shippingCharged: 0,
        //     shippingAndHandlingFee: 25,
        //     ebayFee: 120,
        //     paypalFee: 100,
        //     otherFee: 0,
        //     costPerItem: 1200,
        //     totalCost: 1420,
        //     netProfit: 80
        // }

        // axios.post('/sales.json', sales)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
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
                        columns={salesTrackerColumns(this.onSalesRenderEditableCellHandler)}/>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOverviewData: () => dispatch(actions.fetchOverviewData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);