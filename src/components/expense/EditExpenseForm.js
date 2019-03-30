import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class EditExpenseForm extends Component {

    state = {
        expense : {
            location: "",
            amount: "",
            date: "",
            category: "",
            id: "",
            userId: ""
        },
        snackBarOpen: false,
        errorMsg: ""
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errorMsg: nextProps.errorMsg
        })
    }

    handleInputChange = (e) => {
        let expense = {...this.state.expense}
        expense[e.target.id] = e.target.value
        this.setState({ expense })
        console.log(this.state.expense)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        if (this.validateExpense(this.state.expense)) {
            this.props.editExpense(this.state.expense)   
            // show success message
            this.setState({
                snackBarOpen: true
            })
        } else {
            this.setState({
                errorMsg: "All values must be non-null"
            })
        }
    }

    validateExpense = (expense) => {
        return expense.location && expense.amount && expense.date && expense.category
    }

    handleClose = () => {
        this.setState({
            snackBarOpen: false
        })
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.expense !== prevProps.expense) {
            this.setState({ expense: this.props.expense })
        }
    }

    render() {
        let expense = this.state.expense;
        if (this.props.show) {
            const errorMsg = this.state.errorMsg ? 
                (<div className="card-panel red accent-3">{this.state.errorMsg}</div>) : null
            return (
                <div className="add-expense-form">
                    {errorMsg}
                    <form onSubmit={this.handleSubmit} className="col s4">
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} value={expense.location} id="location" type="text" className="validate"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} value={expense.amount} id="amount" type="number" className="validate"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} value={expense.date} id="date" type="date" className="validate"/>
                            </div>
                        </div>
                        <div className="row">
                            <select onChange={this.handleInputChange} value={expense.category} className="browser-default col s4" id="category">
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
                        <button className="add-expense-btn btn waves-effect waves-light" type="submit" name="action">
                            Edit
                        </button>  
                        <button onClick={() => {this.props.toggle('table')}} className="add-expense-btn btn waves-effect waves-light">
                            Back
                        </button>  
                    </form>

                    <Snackbar
                        open={this.state.snackBarOpen}
                        message={'Success! Expense edited'}
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

export default EditExpenseForm