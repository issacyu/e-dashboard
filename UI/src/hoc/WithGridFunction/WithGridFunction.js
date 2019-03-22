import React, {Component} from 'react';

import Chance from "chance";

const withGridFunction = (WrappedComponent) => {
    return class extends Component{
        state = {
            id: 0,
            selection: [],
            selectAll: false,
            data: [],
            disableDeleteButton: true
        }

        setData = (data) => {
            // Each data must contains an id 
            // in order to show a checkbox.
            this.setState({data: data});
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

        onDeleteRowHandler = () => {
            const dataClone = [...this.state.data];
            const newData = dataClone.filter(r => !this.state.selection.includes(r.id));
            this.setState({data: [...newData]});
        };

        onAddRowHandler = (emptyRow) => {
            const chance = new Chance();
            emptyRow['id'] = chance.guid(); 
            let newData = [...this.state.data];
            newData.push(emptyRow);
            this.setState({data: [...newData]});
        }

        render(){
            const { toggleSelection, toggleAll, isSelected } = this;
            const { data, selectAll } = this.state;
            const checkboxProps = {
              selectAll,
              isSelected,
              toggleSelection,
              toggleAll,
              selectType: "checkbox",
            };

            return(
                <div>
                    <WrappedComponent 
                        setData={this.setData} 
                        checkboxProps ={checkboxProps}
                        onDeleteRowHandler={this.onDeleteRowHandler}
                        onAddRowHandler={this.onAddRowHandler}
                        {...this.state}
                        {...this.props} 
                    />
                </div>
            );
        }
    }
}

export default withGridFunction;