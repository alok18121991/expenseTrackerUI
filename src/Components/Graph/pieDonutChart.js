import React from "react";
import ReactApexChart from "react-apexcharts";


class PieDonutChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [],
            options: {
                chart: {
                    type: 'donut',

                },
                labels: [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        };
    };

    componentDidMount() {
        this.setState(prevState => ({
            options: {
                ...prevState.options,
                labels: this.props.labels
            },
            series: this.props.series

        }))
    }

    render() {
        return (
            this.state.series && this.state.series.length ?
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
                : ""
        )
    }
}

export default PieDonutChart;