const salesTrackerColumns = (onRenderEditableCellHandler) => {
    const columns = 
        [
            {
                Header: 'Date Sold',
                accessor: 'dateSold',
                Cell: onRenderEditableCellHandler
            }, 
            {
                Header: 'Item Name',
                accessor: 'itemName',
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
                Header: 'Shipping Charged',
                accessor: 'shippingCharged',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Shipping & Handling Fee',
                accessor: 'shippingAndHandlingFee',
                Cell: onRenderEditableCellHandler
            },            
            {
                Header: 'eBay Fee',
                accessor: 'ebayFee',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'PayPal Fee',
                accessor: 'paypalFee',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Other Fee',
                accessor: 'otherFee',
                Cell: onRenderEditableCellHandler
            },
            {
                Header: 'Cost Per Item',
                accessor: 'costPerItem',
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

export default salesTrackerColumns;