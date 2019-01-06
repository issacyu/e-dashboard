import React, { Component } from 'react';

import DataGrid from '../../components/Table/DataGrid';

class Inventory extends Component {

    state = {
        data: [{
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
            }],
    };

    renderEditable = (cellInfo) =>{
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
            <DataGrid data={this.state.data} 
                columns={
                    [
                        {
                            Header: 'Name',
                            accessor: 'name', // String-based value accessors!
                            Cell: this.renderEditable
                        }, 
                        {
                            Header: 'Age',
                            accessor: 'age',
                            Cell: this.renderEditable // Custom cell components!
                        }, 
                        {
                            id: 'friendName', // Required because our accessor is not a string
                            Header: 'Friend Name',
                            accessor: d => d.friend.name // Custom value accessors!
                        }, 
                        {
                            Header: props => <span>Friend Age</span>, // Custom header components!
                            accessor: 'friend.age'
                        }
                    ]
                }
            />
        )
    }
}

export default Inventory;