export const getTopFive = (data, key, value) => {
    let map = new Map();
    data.forEach(x => {
        if(map.has(x[key])){
            const val = map.get(x[key]) + x[value];
            map.set(x[key], val);
        }
        else{
            map.set(x[key], x[value]);
        }
    });
    return [...map].map(x => {
        let obj = {};       
        obj[key] = x[0];
        obj[value] = x[1];
        return obj;
    })
    .sort((a, b) => {
         return b[value] - a[value]
    });
}