import React from 'react';
import { Container } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm/expenseForm';

class AddExpense extends React.Component {
    render() {
        return (
            <Container fluid className='vert-al'>
                <div className="App-header bg-dark border-top border-white" >
                    <h3>Add Expense</h3>
                    <ExpenseForm></ExpenseForm>
                </div>
            </Container>
            
        )
    }
}

export default AddExpense;