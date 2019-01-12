const manufacturerColumns = (onRenderEditableCellHandler) => {
    const columns = 
        [
            {
                Header: 'Manufacturer',
                accessor: 'name',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Name',
                accessor: 'age',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Phone',
                accessor: 'Friend Name',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Email',
                accessor: 'Friend Name',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Address',
                accessor: 'age',
                Cell: onRenderEditableCellHandler
            },
        ];

    return columns;
}

export default manufacturerColumns;