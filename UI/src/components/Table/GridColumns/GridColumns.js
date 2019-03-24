export const INVENTORY_COLUMNS = (onRenderEditableCellHandler) => {
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

export const MANUFACTURER_COLUMNS = (onRenderEditableCellHandler) => {
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

export const SALES_COLUMNS = (onRenderEditableCellHandler) => {
    const columns = 
        [
            {
                Header: 'Date Sold',
                accessor: 'dateSold',
                Cell: onRenderEditableCellHandler
            }, 
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
                Header: 'Sold Price',
                accessor: 'soldPrice',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Status',
                accessor: 'status',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Shipping Charged',
                accessor: 'shippingCharged',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Shipping & Handling Fee',
                accessor: 'shippingHandlingFee',
                Cell: onRenderEditableCellHandler
            },            
            {
                Header: 'Amazon Fee',
                accessor: 'amazonFee',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Credit Card Fee',
                accessor: 'creditCardFee',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Cost Per Item',
                accessor: 'costPerItem',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Other Cost',
                accessor: 'otherCost',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Total Cost',
                accessor: 'totalCost',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Net Profit',
                accessor: 'netProfit',
                Cell: onRenderEditableCellHandler
            },
        ];

    return columns;
}