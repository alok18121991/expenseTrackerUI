import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import AreaGraph from './AreaGraph/areaGraph';
import { Row, Col } from "react-bootstrap";
import ExpenseCategory from './ExpenseCategory/expenseCategory';
import ExpenseHistory from '../Expense/History/history';
import { HttpStatusCode } from 'axios';
import { callGetExpenseByGroupApi } from '../API/getExpenseByGroup';
import UserList from '../Components/UserList/userList';
import { useLocation } from 'react-router-dom';

function Dashboard(props) {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseListGroupByDate, setExpenseListGroupByDate] = useState({});
    const [expenseListGroupByMode, setExpenseListGroupByMode] = useState({});

    const location = useLocation();

    useEffect(() => {
        if((location.state !== null) && location.state.user !== null){
            setUser(location.state.user);
            setUsers(location.state.group.owners);
            setUsers(prevUsers => location.state.group.owners.map(user => ({
                ...user,
                selected: true
            })));
        }
        else{
            setUser(props.user);
            setUsers([props.user]);
            setUsers(prevUsers => [props.user].map(user => ({
                ...user,
                selected: user.id === props.user.id
            })));
        }
        
       
    }, [props.user, props.users, location.state]);

    useEffect(() => {
        if (users.length > 0) {
            const userIds = users.filter(user => user.selected).map(user => user.id).join(',');
            if(userIds.length >0) {
                getExpenseGroupByGroupType(userIds, 1, "date");
                getExpenseGroupByGroupType(userIds, 1, "mode");
            }else{
                setExpenseListGroupByMode({});
                setExpenseListGroupByDate({});
                setTotalExpense(0);
            }
        }
    }, [users]);

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
        setUsers(prevUsers => prevUsers.map(user => ({
            ...user,
            selected: user.id === userId ? isChecked : user.selected
        })));
    }

    const renderAreaGraph = () => {
        return  <Col key={`total_area_${totalExpense}`}>
            <AreaGraph key={`area_graph_${totalExpense}`} type="area" id={totalExpense} expenseListByDate={expenseListGroupByDate} showCumulative={true} />
        </Col>
    }


    const renderModeOfExpenseCards = () => {
        return expenseListGroupByMode && Object.entries(expenseListGroupByMode).map(([modeTitle, amount]) => (
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
            <h2>{location.state !==null ? location.state.group.name : user.firstName} : This Month</h2>
            <Row>
                <UserList selectedUsers={users} onChange={handleUserSelect} />
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
                        {user && user.id !== "" ? <ExpenseHistory user={user} title="Recent Expenses" sortKey="expenseDate" limit={5} showDivider={false}/> : ""}
                    </Row>
                </>
            }
        </div>
    );
}

export default Dashboard;
