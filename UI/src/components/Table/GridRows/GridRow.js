const EMPTY_INVENTORY_ROW = {
    product: '',
    quantity: 0,
    price: 0.0,
    category: '',
    model: '',
    type: '',
    color: '',
    condition: '',
    manufacturer: '',
    cost: 0.0,
    totalCost: 0.0
}

const EMPTY_MANUFACTURER_ROW = {
    manufacturer: '',
    name: '',
    phone: '',
    email: '',
    address: ''
}

const EMPTY_SALES_ROW = {
    id: '',
    dateSold: '',
    product: '',
    quantity: '',
    status: '',
    soldPrice: '',
    shippingCharged: '',
    shippingHandlingFee: '',
    amazonFee: '',
    creditCardFee: '',
    costPerItem: '',
    otherCost: '',
    totalCost: '',
    netProfit: ''
}

const getEmptyRow = (type) => {
    switch(type) {
        case 'INVENTORY':
            return EMPTY_INVENTORY_ROW;
        case 'MANUFACTURER':
            return EMPTY_MANUFACTURER_ROW;
        default:
            return EMPTY_SALES_ROW;
    }
}

export default getEmptyRow;