import React from 'react';
import ExpenseForm from '../ExpenseForm/expenseForm';

class AddExpense extends React.Component {

    
    render() {
        return (

                <div>
                    <h2>Add Expense</h2>
                    <ExpenseForm></ExpenseForm>
                </div>
            
        )
    }
}

export default AddExpense;