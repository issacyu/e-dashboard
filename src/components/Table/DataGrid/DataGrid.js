import React from 'react';

import { Panel, Button } from 'react-bootstrap';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

const dataGrid = (props) => {
    return(
        <div>
            <Panel bsStyle='primary'>
                <Panel.Heading>
                    {props.title}
                </Panel.Heading>
                <Panel.Body>
                  <ReactTable
                      className="-striped -highlight"
                      defaultPageSize={10}
                      data={props.data}
                      columns={props.columns}
                  />
                </Panel.Body>
                <Panel.Footer>
                    <Button onClick={props.clicked} bsStyle='primary'>Save</Button>
                    <Button bsStyle='danger'>Delete</Button>
                </Panel.Footer>
            </Panel>
        </div>
    )
};

export default dataGrid;