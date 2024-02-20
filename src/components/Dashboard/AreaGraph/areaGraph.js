import React from "react";
import Chart from "react-apexcharts";
import "./areaGraph.css";


class AreaGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                tooltip: {
                    theme:"dark",
                    enabled: false
                },
                chart: {
                    id: "area-graph",
                    foreColor: "#ccc"
                },
                xaxis: {
                    categories: []
                },
                dataLabels: {
                    enabled: false
                }
            },
            series: [],

        };
    }

    componentDidMount() {
        const expenseListByDate = this.props.expenseListByDate;
        const dates = [];
        const amounts = [];
        const cumulativeAmounts = [];

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        for (const [dateString, amount] of Object.entries(expenseListByDate)) {
            const date = new Date(dateString);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
    
            dates.push(formattedDate);
            amounts.push(Math.round(amount)); 
        }

        let cumulativeSum = 0;
        for (const amount1 of amounts) {
            cumulativeSum += amount1;
            cumulativeAmounts.push(cumulativeSum);
        }

        this.setState(prevState => ({
            options: {  
                ...prevState.options, 
                xaxis: {
                    categories: dates 
                }                
            },
            series: [
                {
                    name: "daily expense series",
                    data: amounts
                },
                {
                    name: "cumulative expense series",
                    data: cumulativeAmounts
                }
            ]

        }))

    }

    render() {
        return (
                <div className="mixed-chart">
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="area"
                        width="100%"
                    />
                </div>
        )
    }
}

export default AreaGraph;