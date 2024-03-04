import React from 'react';
import { HttpStatusCode } from "axios";
import { Col, Row } from 'react-bootstrap';
import { BagFill, CurrencyRupee } from 'react-bootstrap-icons';
import moment from "moment";
import "./history.css";
import { callGetExpenseListApi } from '../../API/getExpenseList';
import { callDeleteExpenseApi } from '../../API/deleteExpenseApi';

class ExpenseHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            expenseList: [],
            limit: 5,
            title: "",
            sortKey:"",
        };
    }

    componentDidMount() {
            this.setState({
                ...this.state,
                userId: this.props.user.userId,
                limit: this.props.limit,
                title: this.props.title,
                sortKey: this.props.sortKey
            }, () => {
                this.getExpenseList(this.state.userId, this.state.limit, this.state.sortKey);
            });
    }

    deleteExpense(expenseId) {
        callDeleteExpenseApi(expenseId)
        this.getExpenseList(this.state.userId, this.state.limit);

    }

    getExpenseList(userId, limit, sortKey) {
        callGetExpenseListApi(userId, limit, sortKey).then(response => {
            if (response.status === HttpStatusCode.Ok) {
                this.setState({
                    ...this.state,
                    expenseList: response.data
                });
            }
        });
    }

    getDateFormatted(dateString) {
        let date = moment(dateString);
        return date.format("MMM DD, YYYY");
    }

    formatExpenseTitle(title) {
        return title.length > 16 ? `${title.substring(0, 16)}...` : title;
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                {this.state.expenseList != null && this.state.expenseList.map((expense, index) => {
                    return (
                        <div className="expense-card" key={index}>
                            <div key={expense.id}>
                                <Row>
                                    <Col md={1} xs={2}>
                                        <BagFill color="#2db9c9" size={40} />
                                    </Col>
                                    <Col md={2} xs={4}>
                                        <Row>
                                            <Col>
                                                <div className='card-desc'>{this.formatExpenseTitle(expense.description)}</div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className='card-date'>
                                                    {this.getDateFormatted(expense.expenseDate)}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                            <Col>
                                                <div className='card-amount'><span><CurrencyRupee /></span>{expense.amount}</div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className='card-mode'>{expense.source}</div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {/* <div >
                                    <button type="button" class="btn btn-danger" onClick={() => this.deleteExpense(`${expense.id}`)}>Delete</button>
                                </div> */}
                            </div>
                            <hr />
                        </div>
                    )
                })

                }
            </div>

        )
    }
}

export default ExpenseHistory;