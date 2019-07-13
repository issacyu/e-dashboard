export const getCategories = (data) => {
    const dataCopy = [...data];
    const categoryMap = new Map();
    dataCopy.forEach(x => {
        if(categoryMap.has(x.category)){
            const val = categoryMap.get(x.category) + x.quantity;
            categoryMap.set(x.category, val);
        }
        else{
            categoryMap.set(x.category, x.quantity);
        }
    });
    const categoryArray = Array.from(categoryMap, x => {
        return {
            category: x[0],
            quantity: x[1]
        }
    })
    return categoryArray;
}

export const getTotalItem = (data) => {
    const dataCopy = [...data];
    const totalItem = dataCopy.reduce((a, b) => {
        return a + b.quantity;
    }, 0);
    return totalItem;
}

export const getTotalValue = (data) => {
    const dataCopy = [...data];
    const totalValue = dataCopy.reduce((a, b) => {
        return a + b.quantity * b.price;
    }, 0);
    return parseFloat(totalValue).toFixed(2);
}

export const getTotalCost = (data) => {
    const dataCopy = [...data];
    const totalCost = dataCopy.reduce((a, b) => {
        return a + b.totalCost;
    }, 0);
    return parseFloat(totalCost).toFixed(2);
}

export const getAveragreCost = (data) =>{
    const dataCopy = [...data];
    const totalCost = getTotalCost(dataCopy);
    const quantity = dataCopy.reduce((a, b) => {
        return a + b.quantity;
    }, 0);
    return parseFloat(totalCost / quantity).toFixed(2);
}