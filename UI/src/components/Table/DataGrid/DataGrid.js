import React from 'react';

import { Panel, Button} from 'react-bootstrap';
import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css';

const CheckboxTable = checkboxHOC(ReactTable);

const dataGrid = (props) => {
    return(
        <div>
            <Panel>
                <CheckboxTable
                    className="-striped -highlight"
                    keyField='id'
                    defaultPageSize={10}
                    data={props.data}
                    columns={props.columns}
                    {...props.checkboxProps}
                />
                <Panel.Footer>
                    <Button onClick={() => {props.onSaveHandler()}} bsStyle='primary'>Save</Button>
                    <Button onClick={() => {props.onAddRowHandler(props.emptyRow)}} bsStyle='success'>Add</Button>
                    <Button onClick={() => {props.onDeleteRowHandler()}} disabled={props.disableDeleteButton} bsStyle='danger'>Delete</Button>
                </Panel.Footer>
            </Panel>
        </div>
    )
};

export default dataGrid;