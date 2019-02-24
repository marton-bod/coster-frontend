import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import ExpenseTable from './ExpenseTable'
import AddExpenseForm from './AddExpenseForm'
import EditExpenseForm from './EditExpenseForm'
import axios from 'axios';
import Cookies from 'universal-cookie';


class ExpensePage extends Component {
    
    state = {
        showPanel: 'table',
        expenses: [],
        toEdit: null
    }

    componentDidMount() {
        axios.get('http://localhost:9000/expense/list', { withCredentials: true })
            .then(res => {
                this.setState({
                    expenses: res.data
                })
            })
    }

    toggleShowPanel = (panelName) => {
        this.setState({showPanel: panelName})
    }

    deleteExpense = (id) => {
        axios.get("http://localhost:9000/expense/delete?id=" + id, {withCredentials: true})
            .then(res => {
                let expenses = this.state.expenses.filter(e => {
                    return e.id !== id
                })
                this.setState({
                    expenses: expenses
                })
            })
    }

    addExpense = (expense) => {
        const cookies = new Cookies();
        axios.post("http://localhost:9000/expense/create", { 
                id: "",
                location: expense.location,
                amount: expense.amount,
                date: expense.date,
                category: expense.category,
                userId: cookies.get("auth_id")
            }, 
            {withCredentials: true})
            .then(res => {
                expense.id = res.id
                let expenses = [...this.state.expenses, expense]
                this.setState({
                    expenses: expenses
                });
            })
    }

    getExpenseToEdit = (expense) => {
        this.setState({toEdit: expense})
        this.toggleShowPanel('edit')
    }

    editExpense = (expense) => {
        axios.post("http://localhost:9000/expense/modify", expense, 
            {withCredentials: true})
            .then(res => {
                console.log(res)
                // replace old expense with edited one in table
            })
    }
    
    render() {
        return (
            <div className="expense-page">
                <div className="row">
                    <div className="col s3">
                        <PageTitle title="Expenses" />
                    </div>
                    <div className="col s1">
                        <a onClick={() => {this.toggleShowPanel('add')}} 
                            className="add-btn btn-floating btn-medium waves-effect waves-light green"><i className="material-icons">add</i></a>
                    </div>
                </div>
                <ExpenseTable 
                    show={this.state.showPanel === 'table'} 
                    expenses={this.state.expenses}
                    editExpense={this.getExpenseToEdit}
                    deleteExpense={this.deleteExpense}/>
                <AddExpenseForm 
                    show={this.state.showPanel === 'add'} 
                    toggle={this.toggleShowPanel}
                    addExpense={this.addExpense}/>
                <EditExpenseForm 
                    show={this.state.showPanel === 'edit'}
                    expense={this.state.toEdit}
                    toggle={this.toggleShowPanel}
                    editExpense={this.editExpense}/>
            </div>
        )
    }
}

export default ExpensePage