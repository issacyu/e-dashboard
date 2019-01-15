import React, { Component } from 'react';

import Chance from "chance";
import { Panel, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";

import 'react-table/react-table.css';

const CheckboxTable = checkboxHOC(ReactTable);
const chance = new Chance();

class DataGrid extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: 0,
            selection: [],
            selectAll: false,
            data: this.getData(this.props.data)
        }
    }

    getData = (data) => {
        // Each data must contains an id 
        // in order to show a checkbox.
        const dataWithId = data.map(item => {
            const _id = chance.guid();
            return{
                _id,
                ...item
            }
        });
    
        return dataWithId;
    };

    toggleSelection = (key, shift, row) => {
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        if(keyIndex >= 0) {
            selection = [
                ...selection.slice(0, keyIndex),
                ...selection.slice(keyIndex + 1)
            ]
        }
        else {
            selection.push(key);
        }

        this.setState({selection: [...selection]})
    };

    toggleAll = () => {
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
          const wrappedInstance = this.checkboxTable.getWrappedInstance();
          const currentRecords = wrappedInstance.getResolvedState().sortedData;
          currentRecords.forEach(item => {
            selection.push(item._original._id);
          });
        }
        this.setState({ selectAll, selection });
      };

      isSelected = key => {
        return this.state.selection.includes(key);
      };

    render(){
        const { toggleSelection, toggleAll, isSelected } = this;
        const { data, columns, selectAll } = this.state;
        const checkboxProps = {
          selectAll,
          isSelected,
          toggleSelection,
          toggleAll,
          selectType: "checkbox",
        //   getTrProps: (s, r) => {
        //     const selected = this.isSelected(r.original._id);
        //     return {
        //       style: {
        //         backgroundColor: selected ? "lightgreen" : "inherit"
        //       }
        //     };
        //   }
        };

        return(
            <div>
                <Panel bsStyle='primary'>
                    <Panel.Heading>
                        {this.props.title}
                    </Panel.Heading>
                    <Panel.Body>
                      <CheckboxTable
                          className="-striped -highlight"
                          defaultPageSize={10}
                          ref={r => (this.checkboxTable = r)}
                          data={this.state.data}
                          columns={this.props.columns}
                          {...checkboxProps}
                      />
                    </Panel.Body>
                    <Panel.Footer>
                        <Button onClick={this.props.clicked} bsStyle='primary'>Save</Button>
                        <Button bsStyle='danger'>Delete</Button>
                    </Panel.Footer>
                </Panel>
            </div>
        )
    };
}

export default DataGrid;