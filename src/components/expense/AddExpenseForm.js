import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class AddExpenseForm extends Component {

    state = {
        expense : {
            location: "",
            amount: "",
            date: "",
            category: ""
        },
        snackBarOpen: false
    }

    handleInputChange = (e) => {
        let expense = {...this.state.expense}
        expense[e.target.id] = e.target.value
        this.setState({ expense })
        console.log(this.state.expense)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // validate optionally
        // send to ExpenseTable
        this.props.addExpense(this.state.expense)
        // show success message
        // send to DB via axios
        this.setState({
            snackBarOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            snackBarOpen: false
        })
    }

    render() {
        if (this.props.show) {
            return (
                <div className="add-expense-form">
                    <form onSubmit={this.handleSubmit} className="col s4">
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="location" type="text" className="validate"/>
                                <label htmlFor="location">Location</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="amount" type="number" className="validate"/>
                                <label htmlFor="amount">Amount</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="date" type="date" className="validate"/>
                                <label htmlFor="date">Date</label>
                            </div>
                        </div>
                        <div className="row">
                            <select className="browser-default col s4">
                                <option value="" disabled selected>Category</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                        <button class="btn waves-effect waves-light" type="submit" name="action">Save
                            <i class="material-icons right">add</i>
                        </button>   
                    </form>

                    <Snackbar
                        open={this.state.snackBarOpen}
                        message={'Success! Expense saved'}
                        autoHideDuration={5000}
                        onClose={this.handleClose}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    />
              </div>
            )
        } else {
            return null
        }
    }

}

export default AddExpenseForm