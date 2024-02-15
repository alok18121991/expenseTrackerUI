import React from 'react';

import "./dashboard.css";
import AreaGraph from './AreaGraph/areaGraph';
import { Row, Col } from "react-bootstrap";
import ExpenseCategory from './ExpenseCategory/expenseCategory';
import ExpenseHistory from '../Expense/History/history';
import ReactApexChart from 'react-apexcharts';
import { callGetExpenseListApi } from '../API/getExpenseList';
import { HttpStatusCode } from 'axios';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [44, 55, 41, 17, 15],
            
            options: {
                chart: {
                    type: 'donut',
                    
                },
                labels: ['Home', 'Shopping', 'Food', 'Travel', "Saving"],
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

    render() {
        // let user = {
        //     userId: '65bce7916e102aee72e6706a',
        //     userName: "Alok Kumar Singh"
        //   };
        return (
            <div>
                <Row>
                    <AreaGraph />
                </Row>
                <div>
                    <Row>
                        <Col className='total-expense'>
                            <ExpenseCategory title={"Total Expense"} limit={"0"} amount={"50000"} bgColor="transparent" />
                         </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ExpenseCategory title={"Card"} limit={"20000"} amount={"10000"} bgColor="transparent" />
                        </Col>
                        <Col>
                            <ExpenseCategory title={"Cash"} limit={"10000"} amount={"4000"} bgColor="transparent" />
                        </Col>
                    </Row>
                    <h3>Top Categories</h3>
                    <Row>
                        <div className="chart">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <ExpenseCategory title={"Home"} limit={"40000"} amount={"30000"} />
                        </Col>
                        <Col>
                            <ExpenseCategory title={"Shopping"} limit={"10000"} amount={"8000"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ExpenseCategory title={"Food"} limit={"10000"} amount={"6000"} />
                        </Col>
                        <Col>
                            <ExpenseCategory title={"Travel"} limit={"20000"} amount={"500"} />
                        </Col>
                    </Row>
                </div>
                {this.state.user.userId !== "" ? <ExpenseHistory user={this.state.user} limit={5}/> : ""}
            </div>

        )
    }

}

export default Dashboard;