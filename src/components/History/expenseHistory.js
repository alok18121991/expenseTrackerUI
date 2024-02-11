import React from 'react';
import axios from "axios";

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
        axios.get("http://localhost:8080/expense/" + userId)
            .then(function (response) {
                console.log("get expenses resposne333: ", response);
                // this.state.expenseList = response.data.data;
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
        axios.delete("http://localhost:8080/expense/" + expenseId)
            .then(function (response) {
                console.log("delete expenses resposne333: ", response);
                self.getExpenseList(self.state.userId)
            })
            .catch(function (error) {
                console.log("delete expenses failed : ", error)
            })
    }

    render() {
        return (
            <div>
                <h2>Expense History</h2>
                {this.state.expenseList != null && this.state.expenseList.map((expense, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card-body" key={expense.id}>
                                <div className='history-card-content'>{expense.description}</div>
                                <div className='history-card-content'>{expense.type}</div>
                                <div className='history-card-content'>{expense.source}</div>
                                <div className='history-card-content'>{expense.expenseDate}</div>
                                <div className='history-card-content'><span>Rs. </span>{expense.amount}</div>
                                <div className='history-card-content'>
                                <button type="button" class="btn btn-danger" onClick={() => this.deleteExpense(`${expense.id}`)}>Delete</button>
                                </div>
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