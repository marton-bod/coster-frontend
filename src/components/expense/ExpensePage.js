import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import ExpenseTable from './ExpenseTable'
import AddExpenseForm from './AddExpenseForm'
import axios from 'axios';

class ExpensePage extends Component {
    
    state = {
        showAddForm: false,
        expenses: [{location: "Spar", amount: 1000, date: '2019-02-10', id: 1}]
    }

    componentDidMount() {
        this.setState({loading: true})
        axios.get('http://localhost:9000/expense/list', { withCredentials: true })
            .then(res => {
                this.setState({
                    expenses: res.data
                })
            })
    }

    toggleAddForm = () => {
        this.setState({showAddForm: !this.state.showAddForm})
    }

    deleteExpense = (id) => {
        let expenses = this.state.expenses.filter(e => {
            return e.id !== id
        })
        this.setState({
            expenses: expenses
        })
        // call database
    }

    addExpense = (expense) => {
        console.log(expense)
        let expenses = [...this.state.expenses, expense]
        this.setState({
            expenses: expenses
        });
    }
    
    render() {
        return (
            <div className="expense-page">
                <div className="row">
                    <div class="col s3">
                        <PageTitle title="Expenses" />
                    </div>
                    <div class="col s1">
                        <a onClick={this.toggleAddForm} 
                            class="add-btn btn-floating btn-medium waves-effect waves-light green"><i class="material-icons">add</i></a>
                    </div>
                </div>
                <ExpenseTable 
                    show={!this.state.showAddForm} 
                    expenses={this.state.expenses}
                    deleteExpense={this.deleteExpense}/>
                <AddExpenseForm 
                    show={this.state.showAddForm} 
                    addExpense={this.addExpense}/>
            </div>
        )
    }
}

export default ExpensePage