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
            data: this.getData(this.props.data),
            disableDeleteButton: true
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

        this.setState({
            selection,
            disableDeleteButton: selection.length === 0
        })
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
        this.setState({ 
            selectAll, 
            selection,
            disableDeleteButton: selection.length === 0
        });
      };

      isSelected = key => {
        return this.state.selection.includes(key);
      };

    // onSaveHandler = () => {
    //     console.log("Button clicked!!!");
    // };
 
    onDeleteRowHandler = () => {
        const dataClone = [...this.state.data];
        const newData = dataClone.filter(r => !this.state.selection.includes(r._id));

        this.setState({data: [...newData]});
    };
 
    // TODO Right now the function is not function correctlly because it's not updating the data in parent component.
    // TODO It will be fixed when implement the logic with redux.
    onAddRowHandler = (emptyRow) => {
        const empRow = {
            _id: chance.guid(),
            ...emptyRow
        }
        let newData = [...this.state.data];
        newData.push(empRow);
        this.setState({data: [...newData]});
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
                <Panel>
                    <CheckboxTable
                        className="-striped -highlight"
                        defaultPageSize={10}
                        ref={r => (this.checkboxTable = r)}
                        data={this.state.data}
                        columns={this.props.columns}
                        {...checkboxProps}
                    />
                    <Panel.Footer>
                        <Button onClick={() => {this.props.onSaveHandler()}} bsStyle='primary'>Save</Button>
                        <Button onClick={() => {this.onAddRowHandler(this.props.emptyRow)}} bsStyle='success'>Add</Button>
                        <Button onClick={() => {this.onDeleteRowHandler()}} disabled={this.state.disableDeleteButton} bsStyle='danger'>Delete</Button>
                    </Panel.Footer>
                </Panel>
            </div>
        )
    };
}

export default DataGrid;