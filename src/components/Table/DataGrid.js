import React from 'react';

import { Panel } from 'react-bootstrap';
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
            </Panel>
        </div>
    )
};

export default dataGrid;