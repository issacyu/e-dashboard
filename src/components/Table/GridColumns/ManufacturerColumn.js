const manufacturerColumns = (onRenderEditableCellHandler) => {
    const columns = 
        [
            {
                Header: 'Manufacturer',
                accessor: 'manufacturer',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Name',
                accessor: 'name',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Phone',
                accessor: 'phone',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Email',
                accessor: 'email',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Address',
                accessor: 'address',
                Cell: onRenderEditableCellHandler
            },
        ];

    return columns;
}

export default manufacturerColumns;