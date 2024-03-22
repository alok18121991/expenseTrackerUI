import React, { useContext, useEffect, useState } from 'react';
import "./stats.css";
import { Row, Col } from "react-bootstrap";
import { HttpStatusCode } from 'axios';
import { callGetExpenseByGroupApi } from '../API/getExpenseByGroup';
import UserList from '../Components/UserList/userList';
import AreaGraph from '../Dashboard/AreaGraph/areaGraph';
import ExpenseCategory from '../Dashboard/ExpenseCategory/expenseCategory';
import ExpenseHistory from '../Expense/History/history';
import PieDonutChart from '../Components/Graph/pieDonutChart';
import { ActiveGroupContext, UserContext } from '../Components/Context/context';

function Stats() {
    const [activeUser, ] = useContext(UserContext);
    const [activeGroup, ] = useContext(ActiveGroupContext);

    const [users, setUsers] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseListGroupByDate, setExpenseListGroupByDate] = useState({});
    const [expenseListGroupByMode, setExpenseListGroupByMode] = useState({});
    const [expenseListGroupByType, setExpenseListGroupByType] = useState({});
    const [pieChartTypes, setPieChartTypes] = useState({});
    const [pieChartSeries, setPieChartSeries] = useState({});
    const [monthCount, setMonthCount] = useState(1);

    const groupId = activeGroup && activeGroup.id && activeGroup.name !== "MyGroup"? activeGroup.id : "";

    useEffect(() => {
        if(activeGroup && activeGroup.id && activeGroup.name !== "MyGroup"){
            setUsers(prevUsers => activeGroup.owners.map(owner => ({
                ...owner,
                selected: true
            })));
        }
        else{
            setUsers([
                {
                ...activeUser,
                selected: true
            }
            ]);
        }
    }, [activeUser, activeGroup]);

    useEffect(() => {
        if (users.length > 0) {
            const userIds = users.filter(user => user.selected).map(user => user.id).join(',');
            if(userIds.length >0) {
                getExpenseGroupByGroupType(groupId, userIds, monthCount, "date");
                getExpenseGroupByGroupType(groupId, userIds, monthCount, "mode");
                getExpenseGroupByGroupType(groupId, userIds, monthCount, "type");
            }else{
                setExpenseListGroupByMode({});
                setExpenseListGroupByDate({});
                setExpenseListGroupByType({});
                setTotalExpense(0);
            }
        }
    }, [users, monthCount, groupId]);

    const getExpenseGroupByGroupType = (groupid, userId, monthCount, groupType) => {
        callGetExpenseByGroupApi(groupid, userId, monthCount, groupType).then(response => {
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
            <AreaGraph key={`area_graph_${totalExpense}`} type="bar" id={totalExpense} expenseListByDate={expenseListGroupByDate} showCumulative={true} />
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

    const updateMonth = (monthCount) => {
        setMonthCount(monthCount)
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
            <h2>{activeGroup ? activeGroup.name : activeUser.firstName} : Stats</h2>
            <Row>
                <UserList selectedUsers={users} onChange={handleUserSelect} />
            </Row>
           
            {totalExpense === 0 || totalExpense === undefined || totalExpense === null ?
                <Row>
                    <Col key={`noexpense_${totalExpense}`}>
                       No Expense for this group!!!
                    </Col>
                </Row>
                :
                <>
                    <Row>
                        <Col onClick={() => updateMonth(1)} className={1 === monthCount ? "user-list" : ""}>
                            1 month
                        </Col>
                        <Col onClick={() => updateMonth(3)} className={3 === monthCount ? "user-list" : ""}>
                            3 months
                        </Col>
                        <Col onClick={() => updateMonth(6)} className={6 === monthCount ? "user-list" : ""}>
                            6 months
                        </Col>
                    </Row>
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
                        {activeUser && activeUser.id !== "" ? <ExpenseHistory title="Top Expenses" sortKey="amount" limit={5} showDivider={false} monthCount={monthCount}/> : ""}
                    </Row>
                </>
            }
        </div>
    );
}

export default Stats;
