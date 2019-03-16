import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as JsonPatch from 'fast-json-patch';
import * as actions from '../../store/actions/overview'
import Card from '../../components/Card/Card';
import { Row, Col, Panel } from 'react-bootstrap';

import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';
import DataGrid from '../../components/Table/DataGrid/DataGrid';
import salesTrackerColumns from '../../components/Table/GridColumns/SalesTrackerColumns';

class Overview extends Component {

    state = {
        salesData: [],
        origSalesData: [],
        mockData: 
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

    componentDidMount() {
        this.props.onFetchOverviewData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.overviewData !== prevProps.overviewData) {
            this.setState({
                salesData: JSON.parse(JSON.stringify(this.props.overviewData)),
                origSalesData: JSON.parse(JSON.stringify(this.props.overviewData))
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

    onSaveOverviewHandler = () => {
        const patchDoc = JsonPatch.compare(this.state.origSalesData, this.state.salesData);
        this.props.onSaveOverviewData(patchDoc, this.state.salesData);
    }

    render(){
        return(
            <div>
                <Row className="show-grid">
                    <Col md={4} lg={4}>
                        <Panel>
                            <ul class="list-group">
                                <li class="list-group-item">Sales: $71365.98</li>
                                <li class="list-group-item">Renvenue: $45265.28</li>
                                <li class="list-group-item">Order: 64031</li>
                                <li class="list-group-item">Return: 235</li>
                            </ul>
                        </Panel>
                    </Col>

                    <Col md={8} lg={8}>
                        <LineChart />
                    </Col>
                </Row>
                <Row>
                    <Col md={3} lg={3}>
                        Top 5 selling products
                        <BarChart 
                            width={600}
                            height={300}
                        />
                    </Col>
                    <Col md={3} lg={3}>
                        Category
                        <PieChart 
                            bsStyle='primary'
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
                    <Col md={3} lg={3}>
                        Category trending
                        <LineChart />
                    </Col>
                    <Col md={3} lg={3}>
                        cost vs profit
                        <PieChart 
                            bsStyle='primary'
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
                </Row>
                <Row>
                    <Col md={12} lg={12}>
                        <DataGrid 
                            //The key uses to notify the child component to re-render.
                            key={this.props.overviewData}
                            data={this.props.overviewData}
                            columns={salesTrackerColumns(this.onSalesRenderEditableCellHandler)}
                            onSaveHandler={this.onSaveOverviewHandler}
                            />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        overviewData: state.overview.overviewData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOverviewData: () => dispatch(actions.fetchOverviewData()),
        onSaveOverviewData: (patchDoc, salesData) => dispatch(actions.saveOverviewData(patchDoc, salesData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);