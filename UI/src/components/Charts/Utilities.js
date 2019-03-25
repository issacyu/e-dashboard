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

export const getSaleAndProfit = (data) => {
    let date = new Date();
    let map = new Map();
    map.set(getMonthAndYear(date), {Sales: 0, Profit: 0});
    for(let i = 0; i < 12; i++){
        date.setMonth(date.getMonth() - 1);
        const monthAndYear = getMonthAndYear(date);
        map.set(monthAndYear, {Sales: 0, Profit: 0});
    }
    for(let d of data){
        const monthAndYear = getMonthAndYear(new Date(d.dateSold));
        if(map.has(monthAndYear)){
            let sale = map.get(monthAndYear);
            sale.Sales = sale.Sales + d.soldPrice;
            sale.Profit = sale.Profit + d.netProfit;
            map.set(monthAndYear, sale);
        }
    }
    return [...map].map(x => {
        let obj = {};
        obj.Date = x[0];
        obj.Sales = x[1].Sales;
        obj.Profit = x[1].Profit;
        return obj;
    });
}

const getMonthAndYear = (date) => {
    const localDate = date.toLocaleDateString().split('/');
    return localDate[0] + '/' + localDate[2]
}