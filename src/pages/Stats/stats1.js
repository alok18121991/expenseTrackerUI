import React, { useContext, useEffect, useState } from 'react';
import "./stats1.css";
import { Row, Col } from "react-bootstrap";
import { HttpStatusCode } from 'axios';
import { callGetExpenseByGroupApi } from '../API/getExpenseByGroup';
import UserList from '../Components/UserList/userList';
import { useLocation } from 'react-router-dom';
import AreaGraph from '../Dashboard/AreaGraph/areaGraph';
import ExpenseCategory from '../Dashboard/ExpenseCategory/expenseCategory';
import ExpenseHistory from '../Expense/History/history';
import PieDonutChart from '../Components/Graph/pieDonutChart';
import { UserContext } from '../Components/Context/context';

function Stats1(props) {
    const activeUser = useContext(UserContext);
    const [user, ] = useState(activeUser);
    const [users, setUsers] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseListGroupByDate, setExpenseListGroupByDate] = useState({});
    const [expenseListGroupByMode, setExpenseListGroupByMode] = useState({});
    const [expenseListGroupByType, setExpenseListGroupByType] = useState({});
    const [pieChartTypes, setPieChartTypes] = useState({});
    const [pieChartSeries, setPieChartSeries] = useState({});

    const location = useLocation();

    useEffect(() => {
        if((location.state !== null) && location.state.user !== null){
            // setUser(location.state.user);
            setUsers(location.state.group.owners);
            setUsers(prevUsers => location.state.group.owners.map(user => ({
                ...user,
                selected: true
            })));
        }
        else{
            // setUser(props.user);
            setUsers([user]);
            setUsers(prevUsers => [user].map(thisUser => ({
                ...user,
                selected: thisUser.id === user.id
            })));
        }
        
       
    }, [user, props.users, location.state]);

    useEffect(() => {
        if (users.length > 0) {
            const userIds = users.filter(user => user.selected).map(user => user.id).join(',');
            if(userIds.length >0) {
                getExpenseGroupByGroupType(userIds, 1, "date");
                getExpenseGroupByGroupType(userIds, 1, "mode");
                getExpenseGroupByGroupType(userIds, 1, "type");
            }else{
                setExpenseListGroupByMode({});
                setExpenseListGroupByDate({});
                setExpenseListGroupByType({});
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
                else if (groupType === "date") {
                    setExpenseListGroupByDate(response.data);
                }
                else if (groupType === "type") {
                    setExpenseListGroupByType(response.data);

                    const types = [];
                    const amounts = [];

                    for (const [type, amount] of Object.entries(response.data)) {

                        types.push(type);
                        amounts.push(Math.round(amount));
                    }

                    setPieChartTypes(types);
                    setPieChartSeries(amounts);
                    // this.setState(prevState => ({
                    //     options: {
                    //         ...prevState.options,
                    //         labels: types
                    //     },
                    //     series: amounts

                    // }))
                }
            } else {
                setExpenseListGroupByMode({});
                setExpenseListGroupByDate({});
                setExpenseListGroupByType({});
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

    const renderPieChart = () => {
        return pieChartSeries && <Row>
            <div className="chart" key="pie-chart">
                <PieDonutChart labels={pieChartTypes} series={pieChartSeries} />
            </div>
        </Row> 

    }

    const renderCategoryCards = () => {
        return expenseListGroupByType && Object.entries(expenseListGroupByType).map(([typeTitle, amount]) => {
                return (
                    <Col xs={6} key={`total_expense_${typeTitle}_${amount}`}>
                        <ExpenseCategory title={typeTitle} limit={"40000"} amount={amount} />
                    </Col>
                );
            })
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
                    <h3>Categories</h3>
                        <Row>
                            {renderPieChart()}
                        </Row>
                        <Row>
                            {renderCategoryCards()}
                        </Row>
                    <Row>
                        {user && user.id !== "" ? <ExpenseHistory user={user} title="Recent Expenses" sortKey="amount" limit={5} showDivider={false}/> : ""}
                    </Row>
                </>
            }
        </div>
    );
}

export default Stats1;
