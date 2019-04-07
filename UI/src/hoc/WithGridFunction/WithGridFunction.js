import React, {Component} from 'react';

import Modal from '../../components/Modal/Modal';
import Chance from "chance";

const withGridFunction = (WrappedComponent) => {
    return class extends Component{
        state = {
            id: 0,
            selection: [],
            selectAll: false,
            data: [],
            disableDeleteButton: true,
            showModal: false,
            modalTitle: '',
            modalBody: '',
            modalStyle: ''
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

        isSelected = key => {
            return this.state.selection.includes(key);
        };

        onToggleModalHandler = (modalTitle, modalBody, modalStyle) => {
            this.setState((prevState) => ({
                showModal: !prevState.showModal,
                modalTitle: modalTitle,
                modalBody: modalBody,
                modalStyle: modalStyle
            }))
            console.log(this.state.modalStyle)
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
                    <Modal 
                        showModal={this.state.showModal}
                        title={this.state.modalTitle}
                        body={this.state.modalBody}
                        style={this.state.modalStyle}
                        toggle={this.onToggleModalHandler}
                    />
                    <WrappedComponent 
                        setData={this.setData} 
                        checkboxProps ={checkboxProps}
                        onDeleteRowHandler={this.onDeleteRowHandler}
                        onAddRowHandler={this.onAddRowHandler}
                        toggleModal={this.onToggleModalHandler}
                        {...this.state}
                        {...this.props} 
                    />
                </div>
            );
        }
    }
}

export default withGridFunction;