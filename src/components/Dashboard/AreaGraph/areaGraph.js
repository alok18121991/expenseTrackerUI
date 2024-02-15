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
                    foreColor: "#ccc",
                },
                xaxis: {
                    categories: [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10]
                },
                dataLabels: {
                    enabled: false
                }
            },
            series: [
                {
                    name: "Series 1",
                    data: [45, 52, 38, 45, 19, 23, 2,45, 52, 38, 45, 19, 23, 2,45, 52, 38, 45, 19, 23, 2,45, 52, 38, 45, 19, 23, 2]
                },
                {
                    name: "Series 2",
                    data: [50, 160, 30, 70, 90, 100, 90]
                }
            ],

        };
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