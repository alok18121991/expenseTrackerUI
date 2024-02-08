import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { createExpense } from '../../API/createExpenseApi';

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '65bce7916e102aee72e6706a',
            amount: '',
            expenseDate: '',
            type: '',
            subType: '',
            description: '',
            source: ''
        };
    }

    componentDidMount() {
        // axios.get(
        //         `http://localhost:8080/user/all`
        //     )
        //     .then((response) => {
        //         let posts = response.data.data.data;
        //         console.log("tess", posts[0]);
        //         this.setState({ posts });
        //     });
    }

    createExpense = event => {
        
        event.preventDefault();
        createExpense(this.state, event);
        
    }

    categoryMap = [
        {
            name: "Home",
            value: "home"
        },
        {
            name: "Shopping",
            value: "shopping"
        },
        {
            name: "Food",
            value: "food"
        },
        {
            name: "Travel",
            value: "travel"
        }
    ];

    subCategoryMap = [
        {
            name: "Rent",
            value: "rent"
        },
        {
            name: "House Help",
            value: "househelp"
        },
        {
            name: "Grocery",
            value: "grocery"
        },
        {
            name: "Internet",
            value: "internet"
        }
    ];

    sourceMap = [
        {
            name: "Credit Card",
            value: "creditCard"
        },
        {
            name: "Cash",
            value: "cash"
        }
    ];

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    handleDateChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: new Date(value)
        });
    };

    handleAmountChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: parseFloat(value)
        });
    };

    handleClick(event) {
        event.preventDefault()
        console.log("state", this.state);
    }

    currentDateLimt = new Date().toISOString().split('T')[0];
    

    render() {
        return (
            <Form onSubmit={(i) => this.createExpense(i)}>
                <Form.Group className="mb-3" controlId="expenseForm.amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter Amount" name="amount" step="0.1" min='0' onChange={this.handleAmountChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.amount">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="expenseDate" onChange={this.handleDateChange} max={this.currentDateLimt} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.source">
                    <Form.Label>Source</Form.Label>
                    <Form.Select aria-label="Default select example" name="source" onChange={this.handleChange} required>
                        <option>Select Source</option>
                        {this.sourceMap.map((category) => {
                            return (
                                <option key={category.value} value={category.value}>{category.name}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example" name="type" onChange={this.handleChange} required>
                        <option>Select Category</option>
                        {this.categoryMap.map((category) => {
                            return (
                                <option key={category.value} value={category.value}>{category.name}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.subCategory">
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Select aria-label="Default select example" name="subType" onChange={this.handleChange} required>
                        <option>Select Sub Category</option>
                        {this.subCategoryMap.map((category) => {
                            return (
                                <option key={category.value} value={category.value}>{category.name}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Expense
                </Button>
            </Form>
        );
    }
}


export default ExpenseForm;