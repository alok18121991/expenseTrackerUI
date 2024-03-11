import React, { useEffect, useState } from 'react';
import { HttpStatusCode } from "axios";
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { ArrowRight, BagFill, CurrencyRupee } from 'react-bootstrap-icons';
import moment from "moment";
import "./history.css";
import { callDeleteExpenseApi } from '../../API/deleteExpenseApi';
import { callGetExpenseListForGroupUsersApi } from '../../API/getExpenseListForGroupUsers';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function ExpenseHistory(props) {

    const [expenseList, setExpenseList] = useState([]);
    const [, setGroupId] = useState("");
    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const showDivider = props.showDivider !== null || (location.state && location.state.showDivider)? props.showDivider || (location.state && location.state.showDivider) : true;

    // const [userId, setUserId] = useState("");
    const handleClose = (e) => {
        setShow(false);
    }

    const handleShow = (e) => {
        e.stopPropagation();
        setShow(true)
    }


    useEffect(() => {
        if (location.state != null && location.state.group != null) {
            setGroupId(location.state.group.id);
            // setUserId("");
        }
        getExpenseList();
    }, [props.limit, props.sortKey, location]);

    const toggleExpense = (id) => {
        let expenseId = selectedExpenses.find(expenseId => expenseId === id);
        if (expenseId) {
            setSelectedExpenses(selectedExpenses.filter(expenseId => expenseId !== id));
        } else {
            setSelectedExpenses([...selectedExpenses, id]);
        }

    }

    const getExpenseList = () => {
        let params = {
            "groupId": "",
            "userIds": "",
            "limit": props.limit,
            "sortKey": props.sortKey,
            "numMonth": 1
        };
        if (location.state != null && location.state.group != null) {
            params = {
                ...params,
                "groupId": location.state.group.id

            }
        }
        else {
            params = {
                ...params,
                "userIds": props.user.id

            }
        }
        callGetExpenseListForGroupUsersApi(params)
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

    const getExpenseHistoryState = () => {
        let historystate = {
            user: {
                id: props.user.id,
                fistName: props.user.firstName,
                lastName: props.user.lastName
            },
            showDivider: true
        }
        
        if(location.state && location.state.group){
            let group = location.state.group;
            return historystate = {
                ...historystate,
                group: {
                    id: group.id,
                    name: group.name,
                    owners: group.owners
                }
            }
        }
        else return historystate;
        // return historytate;
    }

    let prevDate = "";
    const renderDivider = (date) => {
        date = getDateFormatted(date);
        prevDate = getDateFormatted(prevDate)
        if (prevDate === "" || (date) !== (prevDate)) {
            prevDate = date //initialize prevDate
            return <div className="list-divider" key={date}>{date}</div>
        }
    }

    return (
        <div >
            <>
                <button onClick={() => navigate(-1)}>go back</button>
                <button onClick={() => navigate(1)}>go forward</button>
            </>
            <Row>
                <Col xs={10}>
                    <h2>{location.state && ((location.state.group) && location.state.group.name) ? location.state.group.name : props.user.firstName} : {props.title}</h2>
                </Col>
                <Col xs={2}>
                    <NavLink key="view all history" className="nav-link" to='/group/history'
                        state={getExpenseHistoryState()}><ArrowRight /></NavLink>
                </Col>
            </Row>

            {expenseList.map((expense, index) => (
                <>
                { showDivider && renderDivider(expense.expenseDate)}
                <div className="expense-card" key={expense.id} onClick={() => toggleExpense(expense.id)}>
                    <div>
                        <Row>
                            <Col md={1} xs={2}>
                                <BagFill color="#2db9c9" size={40} />
                            </Col>
                            <Col md={2} xs={6}>
                                <Row>
                                    <Col>
                                        <div className='card-desc'>{formatExpenseTitle(expense.description)}</div>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col>
                                        <div className='card-date'>
                                            {getDateFormatted(expense.expenseDate)}
                                        </div>
                                    </Col>
                                </Row> */}
                                <Row>
                                    {
                                        expense.userId === props.user.id ?
                                            <Col className='card-user'>
                                                Paid by you
                                            </Col>
                                            :
                                            <Col className='card-other-user'>
                                                Paid by other
                                            </Col>
                                    }
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
                        {selectedExpenses.find(expenseId => expenseId === expense.id) &&
                            <>
                                <Row className="expense-extend-row" >
                                    <Col xs={6} className="expense-extend">
                                        <button type="button" className="btn btn-danger" onClick={handleShow}>Delete</button>
                                    </Col>
                                    <Col xs={6} className="expense-extend">
                                        <button type="button" className="btn btn-success" onClick={() => toggleExpense(expense.id)}>Close</button>
                                    </Col>
                                </Row>
                                <Modal show={show} onHide={handleClose} animation={true} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Expense: {formatExpenseTitle(expense.description)} of <div className='card-amount'><span> <CurrencyRupee /></span>{expense.amount}</div> </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure to delete this expense ?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={() => deleteExpense(expense.id)}>
                                            Delete
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Close
                                        </Button>

                                    </Modal.Footer>
                                </Modal>
                            </>
                        }
                    </div>
                    <hr />

                </div>
                </>
            ))}

        </div>
    );

    
}

export default ExpenseHistory;
