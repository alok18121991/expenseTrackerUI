import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import AreaGraph from './AreaGraph/areaGraph';
import { Row, Col } from "react-bootstrap";
import ExpenseCategory from './ExpenseCategory/expenseCategory';
import ExpenseHistory from '../Expense/History/history';
import { HttpStatusCode } from 'axios';
import { callGetExpenseByGroupApi } from '../API/getExpenseByGroup';
import UserList from '../Components/UserList/userList';

function Dashboard(props) {
    const [user, setUser] = useState({});
    const [, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseListGroupByDate, setExpenseListGroupByDate] = useState({});
    const [expenseListGroupByMode, setExpenseListGroupByMode] = useState({});

    useEffect(() => {
        setUser(props.user);
        setUsers(props.users);
        setSelectedUsers(prevUsers => props.users.map(user => ({
            ...user,
            selected: user.userId === props.user.userId
        })));
    }, [props.user, props.users]);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            const userIds = selectedUsers.filter(user => user.selected).map(user => user.userId).join(',');
            getExpenseGroupByGroupType(userIds, 1, "date");
            getExpenseGroupByGroupType(userIds, 1, "mode");
        }
    }, [selectedUsers]);

    const getExpenseGroupByGroupType = (userId, monthCount, groupType) => {
        callGetExpenseByGroupApi(userId, monthCount, groupType).then(response => {
            if (response.status === HttpStatusCode.Ok) {
                if (groupType === "mode") {
                    setExpenseListGroupByMode(response.data);
                    let sum = Object.values(response.data).reduce((acc, curr) => acc + curr, 0);
                    setTotalExpense(sum);
                }
                if (groupType === "date") {
                    setExpenseListGroupByDate(response.data);
                }
            } else {
                setExpenseListGroupByMode({});
                setExpenseListGroupByDate({});
                setTotalExpense(0);
            }
        })
    }

    const handleUserSelect = event => {
        const userId = event.target.id;
        const isChecked = event.target.checked;
        setSelectedUsers(prevUsers => prevUsers.map(user => ({
            ...user,
            selected: user.userId === userId ? isChecked : user.selected
        })));
    }

    const renderAreaGraph = () => {
        return <AreaGraph type="area" key={`total_expense_${totalExpense}`} expenseListByDate={expenseListGroupByDate} showCumulative={true} />;
    }

    const renderModeOfExpenseCards = () => {
        return Object.entries(expenseListGroupByMode).map(([modeTitle, amount]) => (
            <Col xs={6} key={`modeOfExpenseCard_${modeTitle}_${amount}`}>
                <ExpenseCategory title={modeTitle} limit={"20000"} amount={amount} bgColor="transparent" />
            </Col>
        ));
    }

    const renderTotalExpenseCard = () => {
        return (
            <Col className='total-expense' key={`total_expense_${totalExpense}`}>
                <ExpenseCategory title={"Total Expense"} limit={"0"} amount={totalExpense} bgColor="transparent" />
            </Col>
        );
    }

    return (
        <div>
            <h2>This Month</h2>
            <Row>
                <UserList selectedUsers={selectedUsers} onChange={handleUserSelect} />
            </Row>
            {totalExpense === 0 || totalExpense === undefined || totalExpense === null ?
                <Row>
                    <Col key={`noexpense_${totalExpense}`}>
                        Start by adding expense or select a user
                    </Col>
                </Row>
                :
                <>
                    <Row>
                        {renderAreaGraph()}
                    </Row>
                    <Row>
                        {renderTotalExpenseCard()}
                    </Row>
                    <Row>
                        {renderModeOfExpenseCards()}
                    </Row>
                    <Row>
                        {user.userId !== "" ? <ExpenseHistory user={user} title="Recent Expenses" sortKey="expenseDate" limit={5} /> : ""}
                    </Row>
                </>
            }
        </div>
    );
}

export default Dashboard;
