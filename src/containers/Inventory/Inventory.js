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

        columns: [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
          }, {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Friend Name',
            accessor: d => d.friend.name // Custom value accessors!
          }, {
            Header: props => <span>Friend Age</span>, // Custom header components!
            accessor: 'friend.age'
          }]
    };

    render(){
        return(
            <DataGrid data={this.state.data} columns={this.state.columns}/>
        )
    }
}

export default Inventory;