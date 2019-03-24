export const getTopFive = (data, key, value) => {
    let map = new Map();
    // Build a dictionary with key and value([Coke: 10]). 
    data.forEach(x => {
        if(map.has(x[key])){
            const val = map.get(x[key]) + x[value];
            map.set(x[key], val);
        }
        else{
            map.set(x[key], x[value]);
        }
    });
    // Convert the dictionary into array of objects({Product: Coke, Quantity: 10}).
    return [...map].map(x => {
        let obj = {};       
        obj[key] = x[0];
        obj[value] = x[1];
        return obj;
    })
    // Sort the array by value in decending order.
    .sort((a, b) => {
         return b[value] - a[value]
    });
}

export const getCompleteVsReturn = (data) => {
    let status = [{Status: 'Completed', Number: 0}, {Status: 'Returned', Number: 0}]
    data.forEach(x => {
        if(x.status === 'Completed'){
            status[0].Number = status[0].Number + 1;
        }
        if(x.status === 'Returned'){
            status[1].Number = status[1].Number + 1;
        }
    })
    return status;
}