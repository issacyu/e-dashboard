import React, { Component } from 'react';

import { Row, Panel, Col } from 'react-bootstrap';

import DataGrid from '../../components/Table/DataGrid';
import PieChart from '../../components/Charts/PieChart';

class Inventory extends Component {

    state = {
        data: 
        [
            {
                name: 'Tanner Linsley',
                age: 26,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                }
            },
            {
                name: 'John Doe',
                age: 25,
                friend: {
                    name: 'Bill Gate',
                    age: 18,
                }
            },
            {
                name: 'Jason B',
                age: 31,
                friend: {
                    name: 'Jayden',
                    age: 56,
                }
            },
            {
                name: '',
                age: '',
                friend: {
                    name: '',
                    age: ''
                }
            }
        ],
    };

    onRenderEditableCellHandler = (cellInfo) =>{
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
          />
        )
    }

    render(){
        return(
            <>
            <Row>
                <Panel bsStyle='danger' defaultExpanded>
                    <Panel.Heading>
                        Stock Alert
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                        <ul>
                            <li>alert 1</li>
                            <li>alert 2</li>
                            <li>alert 3</li>
                            <li>alert 4</li>
                        </ul>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </Row>
            
            <Row>
                <Col md={8} lg={8}>
                    <DataGrid data={this.state.data} 
                        title='Manufacturer'
                        columns={
                            [
                                {
                                    Header: 'Manufacturer',
                                    accessor: 'name', // String-based value accessors!
                                    Cell: this.onRenderEditableCellHandler
                                }, 
                                {
                                    Header: 'Name',
                                    accessor: 'age',
                                    Cell: this.onRenderEditableCellHandler // Custom cell components!
                                }, 
                                {
                                    Header: 'Phone', // Required because our accessor is not a string
                                    accessor: 'Friend Name',
                                    Cell: this.onRenderEditableCellHandler  // Custom value accessors!
                                }, 
                                {
                                    Header: 'Email', // Required because our accessor is not a string
                                    accessor: 'Friend Name',
                                    Cell: this.onRenderEditableCellHandler  // Custom value accessors!
                                }, 
                                {
                                    Header: 'Address',
                                    accessor: 'age',
                                    Cell: this.onRenderEditableCellHandler // Custom cell components!
                                },
                            ]
                        }
                    />
                </Col>

                <Col md={4} lg={4}>
                    <PieChart 
                        bsStyle='primary'
                        width={800}
                        height={400}
                        cx={300}
                        cy={200}
                        outerRadius={200}
                        fill='#8884d8'
                    />
                </Col>
            </Row>

            <Row>
                <DataGrid data={this.state.data} 
                    title='Inventory'
                    columns={
                        [
                            {
                                Header: 'Product',
                                accessor: 'name', // String-based value accessors!
                                Cell: this.onRenderEditableCellHandler
                            }, 
                            {
                                Header: 'Quantity',
                                accessor: 'age',
                                Cell: this.onRenderEditableCellHandler // Custom cell components!
                            },
                            {
                                Header: 'Price', // Required because our accessor is not a string
                                accessor: 'Friend Name',
                                Cell: this.onRenderEditableCellHandler  // Custom value accessors!
                            },
                            {
                                Header: 'Category',
                                accessor: 'age',
                                Cell: this.onRenderEditableCellHandler // Custom cell components!
                            }, 
                            {
                                Header: 'Model',
                                accessor: 'age',
                                Cell: this.onRenderEditableCellHandler // Custom cell components!
                            }, 
                            {
                                Header: 'Type', // Required because our accessor is not a string
                                accessor: 'Friend Name',
                                Cell: this.onRenderEditableCellHandler  // Custom value accessors!
                            }, 
                            {
                                Header: 'Color',
                                accessor: 'age',
                                Cell: this.onRenderEditableCellHandler // Custom cell components!
                            },
                            {
                                Header: 'Condition',
                                accessor: 'name', // String-based value accessors!
                                Cell: this.onRenderEditableCellHandler
                            }, 
                            {
                                Header: 'Manufacturer',
                                accessor: 'age',
                                Cell: this.onRenderEditableCellHandler // Custom cell components!
                            }, 
                            {
                                Header: 'Cost',
                                accessor: 'age',
                                Cell: this.onRenderEditableCellHandler // Custom cell components!
                            },
                            {
                                Header: 'Total Cost',
                                accessor: 'age',
                                Cell: this.onRenderEditableCellHandler // Custom cell components!
                            }
                        ]
                    }
                />
            </Row>
            </>
        )
    }
}

export default Inventory;