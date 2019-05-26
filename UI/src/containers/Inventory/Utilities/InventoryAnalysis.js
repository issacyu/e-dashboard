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