import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { callCreateExpenseApi } from '../../../API/createExpenseApi';
import './expenseForm.css';
import { CashCoin, CreditCard2FrontFill } from 'react-bootstrap-icons';
import { HttpStatusCode } from 'axios';
import SuccessModal from '../../../Components/Modal/SuccessModal/successModal';
import { ActiveGroupContext, UserContext } from '../../../Components/Context/context';

function ExpenseForm(props) {

    const [activeUser, ] = useContext(UserContext);
    const [activeGroup,] = useContext(ActiveGroupContext);

    const [formData, setFormData] = useState({
        userId: '',
        amount: '',
        expenseDate: '',
        type: '',
        subType: '',
        description: '',
        source: '',
        group: activeGroup ? activeGroup.id : ''
    });
    const [showModal, setShowModal] = useState(false);

    const defaultGroupName = process.env.REACT_APP_DEFAULT_GROUP;

    const createExpense = (event) => {

        event.preventDefault();
        callCreateExpenseApi(formData).then(response => {
            if (response.status === HttpStatusCode.Ok) {
                setShowModal(true);
                event.target.reset();
            }
        });

    }

    const categoryMap = [
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
        },
        {
            name: "Investment",
            value: "Investment"
        }

    ];

    const subCategoryMap = {
        "Home": [
            {
                name: "Furniture",
                value: "Furniture"
            },
            {
                name: "Electricals",
                value: "Electricals"
            },
            {
                name: "Household Supplies",
                value: "Household Supplies"
            },
            {
                name: "Maintenance",
                value: "Maintenance"
            },
            {
                name: "Mortage",
                value: "Mortage"
            },
            {
                name: "Pets",
                value: "Pets"
            },
            {
                name: "Rent",
                value: "Rent"
            },
            {
                name: "House Help",
                value: "House Help"
            },
            {
                name: "Services",
                value: "Services"
            },
            {
                name: "Groceries",
                value: "Groceries"
            },
            {
                name: "Cleaning",
                value: "Cleaning"
            },
            {
                name: "Electricity",
                value: "Electricity"
            },
            {
                name: "Gas",
                value: "Gas"
            },
            {
                name: "Trash",
                value: "Trash"
            },
            {
                name: "Phone/Internet",
                value: "Phone/Internet"
            },
            {
                name: "Water",
                value: "Water"
            },
            {
                name: "Other",
                value: "Other"
            },
        ],
        "Life": [
            {
                name: "Childcare",
                value: "Childcare"
            },
            {
                name: "Education",
                value: "Education"
            },
            {
                name: "Insurance",
                value: "Insurance"
            },
            {
                name: "Medical Expenses",
                value: "Medical Expenses"
            },
            {
                name: "Taxes",
                value: "Taxes"
            },
            {
                name: "Gym",
                value: "Gym"
            },
            {
                name: "Other",
                value: "Other"
            },
        ],
        "Entertainment": [
            {
                name: "Games",
                value: "Games"
            },
            {
                name: "Movies",
                value: "Movies"
            },
            {
                name: "Music",
                value: "Music"
            },
            {
                name: "Sports",
                value: "Sports"
            },
            {
                name: "OTT",
                value: "OTT"
            },
            {
                name: "Other",
                value: "Other"
            }
        ],
        "Food and Drink": [
            {
                name: "Dining out",
                value: "Dining out"
            },
            {
                name: "Liquor",
                value: "Liquor"
            },
            {
                name: "Snacks",
                value: "Snacks"
            },
            {
                name: "Sweets",
                value: "Sweets"
            },
            {
                name: "Other",
                value: "Other"
            },
        ],
        "Travel": [
            {
                name: "Bus/Train",
                value: "Bus/Train"
            },
            {
                name: "Car",
                value: "Car"
            },
            {
                name: "Gas/Fuel",
                value: "Gas/Fuel"
            },
            {
                name: "Hotel",
                value: "Hotel"
            },
            {
                name: "Parking",
                value: "Parking"
            },
            {
                name: "Flight",
                value: "Flight"
            },
            {
                name: "Taxi/Cab",
                value: "Taxi/Cab"
            },
            {
                name: "Other",
                value: "other"
            },
        ],
        "Shopping": [
            {
                name: "Clothes",
                value: "Clothes"
            },
            {
                name: "Footwear",
                value: "Footwear"
            },
            {
                name: "Personal",
                value: "Personal"
            },
            {
                name: "Gifts",
                value: "Gifts"
            },
            {
                name: "Art/Hobby",
                value: "Art/Hobby"
            },
            {
                name: "Gadgets",
                value: "Gadgets"
            }
        ],
        "Investment": [
            {
                name: "Mutual Fund",
                value: "Mutual Fund"
            },
            {
                name: "PPF",
                value: "PPF"
            },
            {
                name: "Gold",
                value: "Gold"
            },
            {
                name: "Stocks",
                value: "Stocks"
            },
            {
                name: "Other",
                value: "Other"
            }
        ]
    }

    // const sourceMap = [
    //     {
    //         name: "Credit Card",
    //         value: "Credit Card"
    //     },
    //     {
    //         name: "Cash",
    //         value: "Cash"
    //     }
    // ];

    const handleChange = event => {

        const value = event.target.value;
        const name = event.target.name;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })

    };

    const handleDateChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: new Date(value)
            }
        })
    };

    const handleAmountChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: parseFloat(value)
            }
        })
    };

    const currentDateLimt = new Date().toISOString().split('T')[0];

    return (
        activeGroup && activeGroup.id && activeGroup.name !== defaultGroupName? 
        <>
            <h2>
                {activeGroup.name}
            </h2>
            <Form onSubmit={(i) => createExpense(i)} className="expenseForm">
                <Row>
                    <Form.Group className="mb-3 title-amount" controlId="expenseForm.description">
                        <Form.Control type="text" placeholder="Enter Description" name="description" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3 title-amount" controlId="expenseForm.amount">
                    <Form.Control type="number" placeholder="Enter Amount" name="amount" step="0.1" min='0' onChange={handleAmountChange} required />
                </Form.Group>
                <Row className="">
                    <Col xs md>
                        <Form.Group className="" controlId="expenseForm.category">
                            <Form.Label>Paid by</Form.Label>
                            <Form.Select aria-label="Category" name="userId" onChange={handleChange} required>
                                <option value="">Select User</option>
                                {activeGroup.owners.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>{
                                            user.id === activeUser.id ?
                                                "You" :
                                                user.firstName}
                                        </option>
                                    )
                                })

                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs md>
                        <Form.Group controlId="expenseForm.date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Date" name="expenseDate" onChange={handleDateChange} max={currentDateLimt} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3 mode-options" controlId="expenseForm.mode">
                    <Form.Label>Mode of payment</Form.Label>
                    <Row>
                        <Col xs md>
                            <Form.Check
                                label={<CreditCard2FrontFill />}
                                name="source"
                                type="radio"
                                id="Card"
                                value="Credit Card"
                                required
                                onChange={handleChange}
                            />
                        </Col>
                        <Col xs md>
                            <Form.Check
                                label={<CashCoin />}
                                name="source"
                                type="radio"
                                id="Cash"
                                value="Cash"
                                required
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="expenseForm.category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Category" name="type" onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categoryMap.map((category) => {
                            return (
                                <option key={category.value} value={category.value} >{category.name}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="expenseForm.subCategory">
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Select aria-label="Sub Category" name="subType" onChange={handleChange} required>
                        <option value="">Select Sub Category</option>
                        {formData.type !== '' && subCategoryMap[formData.type].map((category) => {
                            return (
                                <option key={category.value} value={category.value}>{category.name}</option>
                            )
                        })

                        }
                    </Form.Select>
                </Form.Group>
                <Row className='add-expense-row'>
                    <Button variant="primary" type="submit" className='add-expense-btn'>
                        Add Expense
                    </Button>
                </Row>
            </Form>
            <SuccessModal show={showModal} onHide={() => setShowModal(false)} />
        </>
        : 
        <div>
            <h2>
                No Group Selected !!!
            </h2>
            <h3>
                selected group is not valid, please select valid group from group tab
            </h3>
        </div>
    );
}


export default ExpenseForm;