import React from 'react';

import ReactTable from 'react-table';

import 'react-table/react-table.css';

const dataGrid = (props) => {
    return(
        <div>
          <ReactTable
            className="-striped -highlight"
            defaultPageSize={10}
            data={props.data}
            columns={props.columns}
          />
      </div>
    )
};

export default dataGrid;