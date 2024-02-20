import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { callCreateExpenseApi } from '../../API/createExpenseApi';
import './expenseForm.css';

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            amount: '',
            expenseDate: '',
            type: '',
            subType: '',
            description: '',
            source: ''
        };
    }

    createExpense = event => {
        
        event.preventDefault();
        callCreateExpenseApi(this.state, event);
        
    }

    users = [
        {
            userId: '65bce7916e102aee72e6706a',
            userName: 'Alok Kumar Singh'
        },
        {
            userId: '65bd004222aa8c35198c22be',
            userName: 'Rashi Vishwakarma'
        }
    ];

    categoryMap = [
        {
            name: "Home",
            value: "Home"
        },
        {
            name: "Life",
            value: "Life"
        },
        {
            name: "Entertainment",
            value: "Entertainment"
        },
        {
            name: "Food and Drink",
            value: "Food and Drink"
        },
        {
            name: "Travel",
            value: "Travel"
        },
        {
            name: "Shopping",
            value: "Shopping"
        }
    ];

    subCategoryMap = {
        "Home" : [
            {
                name:"Furniture",
                value:"Furniture"
            },
            {
                name:"Electricals",
                value:"Electricals"
            },
            {
                name:"Household Supplies",
                value:"Household Supplies"
            },
            {
                name:"Maintenance",
                value:"Maintenance"
            },
            {
                name:"Mortage",
                value:"Mortage"
            },
            {
                name:"Pets",
                value:"Pets"
            },
            {
                name:"Rent",
                value:"Rent"
            },
            {
                name:"House Help",
                value:"House Help"
            },
            {
                name:"Services",
                value:"Services"
            },
            {
                name:"Groceries",
                value:"Groceries"
            },
            {
                name:"Cleaning",
                value:"Cleaning"
            },
            {
                name:"Electricity",
                value:"Electricity"
            },
            {
                name:"Gas",
                value:"Gas"
            },
            {
                name:"Trash",
                value:"Trash"
            },
            {
                name:"Phone/Internet",
                value:"Phone/Internet"
            },
            {
                name:"Water",
                value:"Water"
            },
            {
                name:"Other",
                value:"Other"
            },
        ],
        "Life" : [
            {
                name:"Childcare",
                value:"Childcare"
            },
            {
                name:"Education",
                value:"Education"
            },
            {
                name:"Insurance",
                value:"Insurance"
            },
            {
                name:"Medical Expenses",
                value:"Medical Expenses"
            },
            {
                name:"Taxes",
                value:"Taxes"
            },
            {
                name:"Gym",
                value:"Gym"
            },
            {
                name:"Other",
                value:"Other"
            },
            {
                name:"OTT",
                value:"OTT"
            },
        ],
        "Entertainment" :[
            {
                name:"Games",
                value:"Games"
            },
            {
                name:"Movies",
                value:"Movies"
            },
            {
                name:"Music",
                value:"Music"
            },
            {
                name:"Sports",
                value:"Sports"
            },
            {
                name:"Other",
                value:"Other"
            }
        ],
        "Food and Drink":[
            {
                name:"Dining out",
                value:"Dining out"
            },
            {
                name:"Liquor",
                value:"Liquor"
            },
            {
                name:"Snacks",
                value:"Snacks"
            },
            {
                name:"Sweets",
                value:"Sweets"
            },
            {
                name:"Other",
                value:"Other"
            },
        ],
        "Travel":[
            {
                name:"Bus/Train",
                value:"Bus/Train"
            },
            {
                name:"Car",
                value:"Car"
            },
            {
                name:"Gas/Fuel",
                value:"Gas/Fuel"
            },
            {
                name:"Hotel",
                value:"Hotel"
            },
            {
                name:"Parking",
                value:"Parking"
            },
            {
                name:"Flight",
                value:"Flight"
            },
            {
                name:"Taxi/Cab",
                value:"Taxi/Cab"
            },
            {
                name:"Other",
                value:"other"
            },
        ],
        "Shopping":[
            {
                name:"Clothes",
                value:"Clothes"
            },
            {
                name:"Footwear",
                value:"Footwear"
            },
            {
                name:"Personal",
                value:"Personal"
            },
            {
                name:"Gifts",
                value:"Gifts"
            },
            {
                name:"Art/Hobby",
                value:"Art/Hobby"
            },
            {
                name:"Gadgets",
                value:"Gadgets"
            }
        ]
    }

    sourceMap = [
        {
            name: "Credit Card",
            value: "Credit Card"
        },
        {
            name: "Cash",
            value: "Cash"
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

    currentDateLimt = new Date().toISOString().split('T')[0];

    render() {
        return (
            <Form onSubmit={(i) => this.createExpense(i)} className="expenseForm">
                <Form.Group className="mb-3" controlId="exampleForm.description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" name="description" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter Amount" name="amount" step="0.1" min='0' onChange={this.handleAmountChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.category">
                    <Form.Label>Paid by</Form.Label>
                    <Form.Select aria-label="Category" name="userId" onChange={this.handleChange} required>
                        <option value="">Select User</option>
                        {this.users.map((user) => {
                            return (
                                <option key={user.userId} value={user.userId}>{user.userName}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Date" name="expenseDate" onChange={this.handleDateChange} max={this.currentDateLimt} required />
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
                    <Form.Select aria-label="Category" name="type" onChange={this.handleChange} required>
                        <option value="">Select Category</option>
                        {this.categoryMap.map((category) => {
                            return (
                                <option key={category.value} value={category.value} >{category.name}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.subCategory">
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Select aria-label="Sub Category" name="subType" onChange={this.handleChange} required>
                        <option value="">Select Sub Category</option>
                        {this.state.type !== '' && this.subCategoryMap[this.state.type].map((category) => {
                            return (
                                <option key={category.value} value={category.value}>{category.name}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
               
                <Button variant="primary" type="submit">
                    Add Expense
                </Button>
            </Form>
        );
    }
}


export default ExpenseForm;