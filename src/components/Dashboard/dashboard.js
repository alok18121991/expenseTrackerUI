import React from 'react';

import "./dashboard.css";
import AreaGraph from './AreaGraph/areaGraph';
import { Row, Col } from "react-bootstrap";
import ExpenseCategory from './ExpenseCategory/expenseCategory';
import ExpenseHistory from '../Expense/History/history';
import ReactApexChart from 'react-apexcharts';
import { callGetExpenseListApi } from '../API/getExpenseList';
import { HttpStatusCode } from 'axios';
import { callGetExpenseByGroupApi } from '../API/getExpenseByGroup';

class Dashboard extends React.Component {

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
            },
            user: {
                userId: ''
            }
        };

    };


    componentDidMount() {
        this.setState({
            ...this.state,
            user: this.props.user,
        }, () => {

            this.getExpenseList(this.state.user.userId, 0);
            this.getExpenseGroupByGroupType(this.state.user.userId, 1, "date");
            this.getExpenseGroupByGroupType(this.state.user.userId, 1, "mode");
            this.getExpenseGroupByGroupType(this.state.user.userId, 1, "type");

        });
    }

    getExpenseList(userId, limit) {
        callGetExpenseListApi(userId, limit).then(response => {
            if (response.status === HttpStatusCode.Ok) {
                this.setState({
                    ...this.state,
                    expenseList: response.data
                });
            }
        });
    }

    getExpenseGroupByGroupType(userId, monthCount, groupType) {
        callGetExpenseByGroupApi(userId, monthCount, groupType).then(response => {
            if (response.status === HttpStatusCode.Ok) {
                this.setState(prevState => ({
                    ...prevState,
                    expenseListGroupBy: {
                        ...prevState.expenseListGroupBy,
                        [groupType]: response.data,
                    }
                }), () => {
                    if (groupType === "mode") {
                        let sum = 0;
                        for (const [mode, amount] of Object.entries(this.state.expenseListGroupBy.mode)) {

                            sum += amount;
                        }
                        this.setState({
                            ...this.state,
                            totalExpense: Math.round(sum)
                        })
                    }
                    else if (groupType === "type") {

                        const types = [];
                        const amounts = [];

                        for (const [type, amount] of Object.entries(this.state.expenseListGroupBy.type)) {

                            types.push(type);
                            amounts.push(Math.round(amount));
                        }
                        this.setState(prevState => ({
                            options: {
                                ...prevState.options,
                                labels: types
                            },
                            series: amounts

                        }))
                    }
                });
            }
        })
    }

    render() {
        return (
            <div>
                <Row>
                    {this.renderAreaGraph()}
                </Row>
                <Row>
                    {this.renderTotalExpenseCard()}

                </Row>
                <Row>
                    {this.renderModeOfExpenseCards()}
                </Row>
                <h3>Top Categories</h3>
                <Row>
                    {this.renderPieChart()}
                </Row>
                <Row>
                    {this.renderCategoryCards()}
                </Row>
                {this.state.user.userId !== "" ? <ExpenseHistory user={this.state.user} limit={5} /> : ""}
            </div>
        )
    }

    renderPieChart() {
        return this.state.series && this.state.series.length ? <Row>
            <div className="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
        </Row> : ""

    }

    renderCategoryCards() {
        return this.state.expenseListGroupBy !== null && this.state.expenseListGroupBy !== undefined
            &&
            this.state.expenseListGroupBy.type !== null && this.state.expenseListGroupBy.type !== undefined ?
            Object.entries(this.state.expenseListGroupBy.type).map(([typeTitle, amount]) => {
                return (
                    <Col xs={6}>
                        <ExpenseCategory title={typeTitle} limit={"40000"} amount={amount} />
                    </Col>
                );
            })
            : "";
    }

    renderAreaGraph() {
        return this.state.expenseListGroupBy !== null && this.state.expenseListGroupBy !== undefined
            &&
            this.state.expenseListGroupBy.date !== null && this.state.expenseListGroupBy.date !== undefined ?
            <AreaGraph expenseListByDate={this.state.expenseListGroupBy.date} />
            : " ";
    }

    renderModeOfExpenseCards() {
        return this.state.expenseListGroupBy !== null && this.state.expenseListGroupBy !== undefined
            &&
            this.state.expenseListGroupBy.mode !== null && this.state.expenseListGroupBy.mode !== undefined ?
            Object.entries(this.state.expenseListGroupBy.mode).map(([modeTitle, amount]) => {
                return (
                    <Col>
                        <ExpenseCategory title={modeTitle} limit={"20000"} amount={amount} bgColor="transparent" />
                    </Col>
                );
            })
            : "";
    }

    renderTotalExpenseCard() {
        return this.state.totalExpense !== undefined ?
            <Col className='total-expense'>
                <ExpenseCategory title={"Total Expense"} limit={"0"} amount={this.state.totalExpense} bgColor="transparent" />
            </Col>
            : "";
    }

}

export default Dashboard;