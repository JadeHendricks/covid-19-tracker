export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => b.cases - a.cases);
}

export const buildChartData = (data, casesType='cases') => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        console.log(chartData)
        lastDataPoint = data[casesType][date];
    }
    
    return chartData;
}

