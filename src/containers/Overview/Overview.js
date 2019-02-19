import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        salesData: []
    }

    componentDidMount() {
        this.props.onFetchOverviewData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.overviewData !== prevProps.overviewData) {
            this.setState({salesData: this.props.overviewData})
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

    onSaveHandler = () => {
        const newOverviewData = [...this.state.salesData];
        this.props.onSaveOverviewData(newOverviewData);
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
                        //The key uses to notify the child component to re-render.
                        key={this.props.overviewData}
                        data={this.props.overviewData}
                        columns={salesTrackerColumns(this.onSalesRenderEditableCellHandler)}
                        onSaveHandler={this.onSaveHandler}
                        />
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
        onSaveOverviewData: (newData) => dispatch(actions.saveOverviewData(newData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);