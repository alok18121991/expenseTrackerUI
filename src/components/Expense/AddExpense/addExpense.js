import React from 'react';
import ExpenseForm from '../ExpenseForm/expenseForm';

class AddExpense extends React.Component {

    
    render() {
        return (

                <div>
                    <h3>Add Expense</h3>
                    <ExpenseForm></ExpenseForm>
                </div>
            
        )
    }
}

export default AddExpense;