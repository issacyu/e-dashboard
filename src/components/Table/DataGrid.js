import React from 'react';

import ReactTable from 'react-table';

import 'react-table/react-table.css';

const dataGrid = (props) => {
    return(
        <div>
        <ReactTable
          data={props.data}
          columns={props.columns}
        />
      </div>
    )
};

export default dataGrid;