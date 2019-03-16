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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // validate optionally
        
        this.props.addExpense(this.state.expense)
        
        // show success message
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
                            <select onChange={this.handleInputChange} className="browser-default col s4" id="category">
                                <option value="" disabled selected>Category</option>
                                <option value="SUPERMARKET">SUPERMARKET</option>
                                <option value="EATOUT">EATOUT</option>
                                <option value="CAFE">CAFE</option>
                                <option value="SPORTS">SPORTS</option>
                                <option value="UTILITIES">UTILITIES</option>
                                <option value="CLOTHES">CLOTHES</option>
                                <option value="ELECTRONICS">ELECTRONICS</option>
                                <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>
                        <button className="add-expense-btn btn waves-effect waves-light" type="submit" name="action">Save
                            <i className="material-icons right">add</i>
                        </button>  
                        <button onClick={() => {this.props.toggle('table')}} className="add-expense-btn btn waves-effect waves-light">
                            Back
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