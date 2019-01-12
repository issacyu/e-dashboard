const inventoryColumns = (onRenderEditableCellHandler) => {
    const columns = 
    [
        {
            Header: 'Product',
            accessor: 'name',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Quantity',
            accessor: 'age',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Price',
            accessor: 'Friend Name',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Category',
            accessor: 'age',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Model',
            accessor: 'age',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Type',
            accessor: 'Friend Name',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Color',
            accessor: 'age',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Condition',
            accessor: 'name',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Manufacturer',
            accessor: 'age',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Cost',
            accessor: 'age',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Total Cost',
            accessor: 'age',
            Cell: onRenderEditableCellHandler
        }
    ];

    return columns;
};

export default inventoryColumns;