import React from 'react';
import axios from "axios";
import { Col, Row} from 'react-bootstrap';
import { BagFill, CurrencyRupee } from 'react-bootstrap-icons';
import moment from "moment";
import "./expenseHistory.css";

class ExpenseHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '65bce7916e102aee72e6706a',
            expenseList: []
        };
    }

    componentDidMount() {
        this.getExpenseList(this.state.userId);
    }


    getExpenseList = userId => {
        var self = this;
        axios.get("http://192.168.1.5:8080/expense/" + userId)
            .then(function (response) {
                console.log("get expenses resposne333: ", response);
                self.setState({
                    ...self.state,
                    expenseList: response.data.data.data
                });
                console.log("get expenses resposne22: ", self.state.expenseList);
            })
            .catch(function (error) {
                console.log("get expenses failed : ", error)
            })
    }

    deleteExpense = expenseId => {
        var self = this;
        axios.delete("http://192.168.1.5:8080/expense/" + expenseId)
            .then(function (response) {
                console.log("delete expenses resposne333: ", response);
                self.getExpenseList(self.state.userId)
            })
            .catch(function (error) {
                console.log("delete expenses failed : ", error)
            })
    }

    getDateFormatted(dateString) {
        let date = moment(dateString);
        return date.format("MMM DD, YYYY");
    }

    formatExpenseTitle(title){
        return title.length > 16 ? `${title.substring(0,16)}...` : title;
    }

    render() {
        return (
            <div>
                <h2>Expense History</h2>
                {this.state.expenseList != null && this.state.expenseList.map((expense, index) => {
                    return (
                        <div className="card expense-card" key={index}>
                            <div className="card-body" key={expense.id}>
                                <Row>
                                    <Col md={1} xs={2}>
                                        <BagFill color="#41ccee" size={40} />
                                    </Col>
                                    <Col md={2} xs={6}>
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
                                    <Col xs={4}>
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
                        </div>

                    )
                })

                }
            </div>

        )
    }
}

export default ExpenseHistory;