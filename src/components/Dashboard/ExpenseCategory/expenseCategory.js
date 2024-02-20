import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { CurrencyRupee } from "react-bootstrap-icons";
import "./expenseCategory.css";

class ExpenseCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: 0,
            limit: -1,
            bgColor: ""
        };
    }

    componentDidMount() {
        const title = this.props.title;
        const limit = this.props.limit;
        const amount = this.props.amount;
        const bgColor = this.props.bgColor;
        if (title !== '') {
            this.setState({
                ...this.state,
                title: title,
                limit: limit,
                amount: Math.round(amount),
                bgColor: bgColor
            });
            console.log("color", bgColor);
        }
        console.log("color", bgColor);

    }

    

    getProgressBarVarient() {
        let percentage = this.getPercentage();
        let barVarient = "info";
        if (percentage < 60 && percentage > 20) {
            barVarient = "success";
        }
        else if (percentage >= 60 && percentage < 80) {
            barVarient = "warning";
        }
        else if (percentage >= 80) {
            barVarient = "danger";
        }

        return barVarient;
    }

    getPercentage() {
        let limit = this.state.limit;
        let amount = this.state.amount;
        let percentage = (limit > 0 && limit !== -1) ? (amount / limit) * 100 : 0;
        return percentage;
    }

    render() {
        return (

            this.state.limit > 0 && this.state.limit !== -1 ? this.renderSquareCard() : this.renderMainCard()

        )
    }

    renderSquareCard() {

        return <div className="expense-track-card card" style={{ backgroundColor: this.state.bgColor }}>
            <div className="card-title-1">
                {this.state.title}
            </div>
            <div className="card-body">
                <div className="expense-category-amount">
                    <CurrencyRupee />{this.state.amount}
                </div>
                <div className="amount-consumed">debited</div>
                <div className="expense-category-amount">
                    <CurrencyRupee />{this.state.limit - this.state.amount}
                </div>
                <div className="amount-saved">left</div>
                <div className="progress-bar-div">
                    <ProgressBar variant={this.getProgressBarVarient()} now={this.getPercentage()} />
                </div>
            </div>
        </div>;
    }

    renderMainCard() {
        return <div className="expense-track-card card" style={{ backgroundColor: this.state.bgColor }}>
            <div className="card-title-main">
                {this.state.title}
            </div>
            <div className="card-body card-body-main">
                <div className="expense-category-amount">
                    <CurrencyRupee />{this.state.amount}
                </div>
            </div>
        </div>;
    }
}

export default ExpenseCategory;