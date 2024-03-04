import React from 'react';

import "./dashboard.css";
import AreaGraph from './AreaGraph/areaGraph';
import { Row, Col } from "react-bootstrap";
import ExpenseCategory from './ExpenseCategory/expenseCategory';
import ExpenseHistory from '../Expense/History/history';
import { callGetExpenseListApi } from '../API/getExpenseList';
import { HttpStatusCode } from 'axios';
import { callGetExpenseByGroupApi } from '../API/getExpenseByGroup';
import UserList from '../Components/UserList/userList';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            selectedUsers: [],
            user: {
                userId: ''
            }
        };

    };


    componentDidMount() {
        this.setState({
            ...this.state,
            user: this.props.user,
            users: this.props.users
        }, () => {

            let users = this.state.users;
            users.forEach(userObj => {
                if (userObj.userId === this.state.user.userId) {
                    userObj.selected = true;
                } else {
                    userObj.selected = false;
                }
            });

            let userList = [];
            users.forEach((obj) => {
                if (obj.selected === true) {
                    userList.push(obj.userId);
                }
            })

            this.getExpenseGroupByGroupType(userList.toString(), 1, "date");
            this.getExpenseGroupByGroupType(userList.toString(), 1, "mode");

            this.setState(prevState => ({
                selectedUsers: [
                    ...users
                ]
            }));

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
                        for (const [, amount] of Object.entries(this.state.expenseListGroupBy.mode)) {

                            sum += amount;
                        }
                        this.setState({
                            ...this.state,
                            totalExpense: Math.round(sum)
                        })
                    }
                });
            } else{
                    this.setState({
                        ...this.state,
                        expenseList: [],
                        totalExpense: 0
                    });
                }
            
        })
    }

    handleUserSelect = event => {
        const userId = event.target.id;
        const isChecked = event.target.checked;

        let users = this.state.selectedUsers;

        users.forEach(userObj => {
            if (userObj.userId === userId) {
                if (isChecked) {
                    userObj.selected = true;
                }
                else if (!isChecked) {
                    userObj.selected = false;
                }
            }
        });

        let userList = [];
        users.forEach((obj) => {
            if (obj.selected === true) {
                userList.push(obj.userId);
            }
        })

        this.getExpenseGroupByGroupType(userList.toString(), 1, "date");
        this.getExpenseGroupByGroupType(userList.toString(), 1, "mode");


        this.setState(prevState => ({
            selectedUsers: [
                ...users
            ]
        }));
    }

    render() {
        return (
            <div>
                <h2>This Month</h2>
                <Row>
                    <UserList selectedUsers={this.state.selectedUsers} onChange={this.handleUserSelect}/>
                </Row>
                {this.state.totalExpense === 0 || this.state.totalExpense === undefined || this.state.totalExpense === null ?
                <Row>
                    <Col key={`noexpense_${this.state.totalExpense}`}>
                        Start by adding expense or select a user
                    </Col>
                </Row>
                 :
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
                        <Row>
                            {this.state.user.userId !== "" ? <ExpenseHistory user={this.state.user} title="Recent Expenses" sortKey="expenseDate" limit={5} /> : ""}
                        </Row>
                    </div>
                }
            </div>
        )
    }

    renderAreaGraph() {
        return this.state.expenseListGroupBy !== null && this.state.expenseListGroupBy !== undefined
            &&
            this.state.expenseListGroupBy.date !== null && this.state.expenseListGroupBy.date !== undefined ?
            <AreaGraph type="area" key={`total_expense_${this.state.totalExpense}`} expenseListByDate={this.state.expenseListGroupBy.date} showCumulative={true}/>
            : " ";
    }

    renderModeOfExpenseCards() {
        return this.state.expenseListGroupBy !== null && this.state.expenseListGroupBy !== undefined
            &&
            this.state.expenseListGroupBy.mode !== null && this.state.expenseListGroupBy.mode !== undefined ?
            Object.entries(this.state.expenseListGroupBy.mode).map(([modeTitle, amount]) => {
                return (
                    <Col xs={6} key={`modeOfExpenseCard_${modeTitle}_${amount}`}>
                        <ExpenseCategory title={modeTitle} limit={"20000"} amount={amount} bgColor="transparent" />
                    </Col>
                );
            })
            : "";
    }

    renderTotalExpenseCard() {
        return this.state.totalExpense !== undefined ?
            <Col className='total-expense' key={`total_expense_${this.state.totalExpense}`}>
                <ExpenseCategory title={"Total Expense"} limit={"0"} amount={this.state.totalExpense} bgColor="transparent" />
            </Col>
            : "";
    }

}

export default Dashboard;