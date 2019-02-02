const salesColumns = (onRenderEditableCellHandler) => {
    const columns = 
        [
            {
                Header: 'Date',
                accessor: 'manufacturer',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Unit Price',
                accessor: 'name',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Quantity',
                accessor: 'phone',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Sales Price',
                accessor: 'email',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Shipping Cost',
                accessor: 'address',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Fees',
                accessor: 'address',
                Cell: onRenderEditableCellHandler
            },            
            {
                Header: 'Revenue',
                accessor: 'address',
                Cell: onRenderEditableCellHandler
            },
        ];

    return columns;
}

export default salesColumns;