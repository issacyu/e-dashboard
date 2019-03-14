const inventoryColumns = (onRenderEditableCellHandler) => {
    const columns = 
    [
        {
            Header: 'Product',
            accessor: 'product',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Quantity',
            accessor: 'quantity',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Price',
            accessor: 'price',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Category',
            accessor: 'category',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Model',
            accessor: 'model',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Type',
            accessor: 'type',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Color',
            accessor: 'color',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Condition',
            accessor: 'condition',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Manufacturer',
            accessor: 'manufacturer',
            Cell: onRenderEditableCellHandler
        }, 
        {
            Header: 'Fee',
            accessor: 'fee',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Cost',
            accessor: 'cost',
            Cell: onRenderEditableCellHandler
        },
        {
            Header: 'Total Cost',
            accessor: 'totalCost',
            Cell: onRenderEditableCellHandler
        }
    ];

    return columns;
};

export default inventoryColumns;