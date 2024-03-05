import React, { useEffect, useState } from 'react';
import { HttpStatusCode } from "axios";
import { Col, Row } from 'react-bootstrap';
import { BagFill, CurrencyRupee } from 'react-bootstrap-icons';
import moment from "moment";
import "./history.css";
import { callGetExpenseListApi } from '../../API/getExpenseList';
import { callDeleteExpenseApi } from '../../API/deleteExpenseApi';
// import { useLocation } from 'react-router-dom';

function ExpenseHistory(props) {

    const [expenseList, setExpenseList] = useState([]);
    // const location = useLocation();

    useEffect(() => {
        getExpenseList();
    }, [props.user.userId, props.limit, props.sortKey]);

    const getExpenseList = () => {
        callGetExpenseListApi(props.user.userId, props.limit, props.sortKey, 1)
            .then(response => {
                if (response.status === HttpStatusCode.Ok) {
                    setExpenseList(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching expense list:", error);
            });
    };

    const deleteExpense = (expenseId) => {
        callDeleteExpenseApi(expenseId)
            .then(() => {
                getExpenseList();
            })
            .catch(error => {
                console.error("Error deleting expense:", error);
            });
    };

    const getDateFormatted = (dateString) => {
        let date = moment(dateString);
        return date.format("MMM DD, YYYY");
    };

    const formatExpenseTitle = (title) => {
        return title.length > 16 ? `${title.substring(0, 16)}...` : title;
    };

    return (
        <div>
            <h2>{props.title}</h2>
            {expenseList.map((expense, index) => (
                <div className="expense-card" key={index}>
                    <div>
                        <Row>
                            <Col md={1} xs={2}>
                                <BagFill color="#2db9c9" size={40} />
                            </Col>
                            <Col md={2} xs={4}>
                                <Row>
                                    <Col>
                                        <div className='card-desc'>{formatExpenseTitle(expense.description)}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='card-date'>
                                            {getDateFormatted(expense.expenseDate)}
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
                        {/* <div>
                            <button type="button" className="btn btn-danger" onClick={() => deleteExpense(expense.id)}>Delete</button>
                        </div> */}
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default ExpenseHistory;
