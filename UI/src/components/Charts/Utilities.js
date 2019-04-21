// Build data for pie chart.
export const processData = (data, key, value) => {
    if(typeof data === 'undefined')
        return [];
    let dataClone = [...data];
    let newData = [];
    let map = new Map();

    dataClone.forEach(x => {
        if(map.has(x[key])) {
            const val = map.get(x[key]) + x[value];
            map.set(x[key], val);
        }
        else{
            map.set(x[key], x[value]);
        }
    });

    map.forEach((v, k) => {
        const obj = {
            name: k,
            value: v
        }
        newData.push(obj);
    });
    return newData;
}