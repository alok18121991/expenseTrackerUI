import React from 'react';
import ExpenseForm from './ExpenseForm/expenseForm';
import ExpenseHistory from '../History/expenseHistory';

class AddExpense extends React.Component {
    render() {
        return (

                <div>
                    <h3>Add Expense</h3>
                    <ExpenseForm></ExpenseForm>
                    <ExpenseHistory></ExpenseHistory>
                </div>
            
        )
    }
}

export default AddExpense;