import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { buildChartData } from '../utils';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false
                },
                ticks: {
                    callback: function(value, index, values) {
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}

const LineGraph = ({ casesType }) => {

    const [data, setData] = useState({});

    useEffect(() => {
        getHistorical();
    }, [casesType])

    const getHistorical = async () => {
        const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120');
        const chartData = buildChartData(response.data, casesType);
        setData(chartData);
    }

    return (
        <div>
            { data?.length > 0 && (
                <Line data={{
                    datasets: [{
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data: data
                    }]
                }} options={ options } />
            ) }
        </div>
    )
}

export default LineGraph;
