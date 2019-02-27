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

const getEmptyRow = (type) => {
    switch(type) {
        case 'INVENTORY':
            return EMPTY_INVENTORY_ROW;
        case 'MANUFACTURER':
            return EMPTY_MANUFACTURER_ROW;
        default:
            return {};
    }
}

export default getEmptyRow;