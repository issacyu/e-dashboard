export const getTopFiveProducts = (data, key, value) => {
    const dataCopy = [...data];
    const productMap = new Map();
    dataCopy.forEach(x => {
        if(productMap.has(x[key])){
            const val = productMap.get(x[key]) + x[value];
            productMap.set(x[key], val);
        }
        else{
            productMap.set(x[key], x[value]);
        }
    });
    const productArray = Array.from(productMap, x => {
        const obj = {};
        obj[key] = x[0];
        obj[value] = x[1];
        return obj;
    })
    const topFiveProductArray = productArray.sort((a, b) => {
        return b[value] - a[value];
    }).slice(0, 5);
    return topFiveProductArray;
} 
    
export const getOrderStatus = (data) => {
    const dataCopy = [...data];
    const statusMap = new Map();
    dataCopy.forEach(x => {
        if(statusMap.has(x.status)){
            const val = statusMap.get(x.status) + 1;
            statusMap.set(x.status, val);
        }
        else{
            statusMap.set(x.status, 1);
        }
    })
    const statusArray = Array.from(statusMap, x => {
        return {
            status: x[0],
            number: x[1]
        }
    })

    return statusArray;
}
    
    export const getSaleAndProfitByDate = (data) => {
        const dataCopy = [...data];
        const date = new Date();
        const saleAndProfitMap = new Map();
        saleAndProfitMap.set(getMonthAndYear(date), {sale: 0, profit: 0});

        //Get month and year from previous 12 months.
        for(let i = 0; i < 11; i++){
            date.setMonth(date.getMonth() - 1);
            const monthAndYear = getMonthAndYear(date);
            saleAndProfitMap.set(monthAndYear, {sale: 0, profit: 0});
        }
        dataCopy.forEach(x => {
            const monthAndYear = getMonthAndYear(new Date(x.dateSold));
            if(saleAndProfitMap.has(monthAndYear)){
                const sale = saleAndProfitMap.get(monthAndYear);
                sale.sale = sale.sale + x.soldPrice;
                sale.profit = sale.profit + x.netProfit;
                saleAndProfitMap.set(monthAndYear, sale);
            }
        })
        const saleAndProfitArray = Array.from(saleAndProfitMap, x => {
            return{
                date: x[0],
                sale: x[1].sale,
                profit: x[1].profit
            }
        });
        return saleAndProfitArray;
    }
    
    const getMonthAndYear = (date) => {
        const localDate = date.toLocaleDateString().split('/');
        return localDate[0] + '/' + localDate[2]
    }

    export const getTotalSale = (data) => {
        const newData = [...data];
        const totalSale = newData.reduce((a, b) => {
            return a + b.soldPrice;
        }, 0)
        return parseFloat(totalSale).toFixed(2);
    }

    export const getTotalProfit = (data) => {
        const newData = [...data];
        const totalProfit = newData.reduce((a, b) => {
            return a + b.netProfit;
        }, 0)
        return parseFloat(totalProfit).toFixed(2);
    }

    export const getTotalOrder = (data) => {
        const newData = [...data];
        const totalOrder = newData.length;
        return totalOrder;
    }

    export const getTotalReturn = (data) => {
        const newData = [...data];
        const totalReturn = newData.reduce((a, b) => {
            if(b.status === 'Returned'){
                return a + 1;
            }
            return a;
        }, 0)
        return totalReturn;
    }