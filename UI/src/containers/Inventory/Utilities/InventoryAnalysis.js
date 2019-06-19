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

export  const getTotalValue = (data) => {
    const dataCopy = [...data];
    const totalValue = dataCopy.reduce((a, b) => {
        return a + b.quantity * b.price;
    }, 0);
    return totalValue.toFixed(2);
}