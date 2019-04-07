import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import { getMonthList, getCurrentMonth, generateAuthHeaders, getErrorDisplayMessage } from '../common/Utils'
import MonthPicker from '../common/MonthPicker'
import ExpenseTable from './ExpenseTable'
import AddExpenseForm from './AddExpenseForm'
import EditExpenseForm from './EditExpenseForm'
import axios from 'axios';

class ExpensePage extends Component {
    
    state = {
        showPanel: 'table',
        expenses: [],
        loading: true,
        toEdit: null,
        filter: "",
        selectedMonth: getCurrentMonth(),
        monthList: getMonthList(),
        addErrorMsg: "",
        editErrorMsg: ""
    }

    componentDidMount() {
        this.loadExpenseData(this.state.selectedMonth);
    }

    loadExpenseData = (month) => {
        this.setState({
            loading: true
        })
        axios.get(process.env.REACT_APP_EXPENSE_SVC_URL + '/expense/list?month=' + month, generateAuthHeaders())
            .then(res => {
                this.setState({
                    expenses: res.data,
                    loading: false
                })
            })
    }

    toggleShowPanel = (panelName) => {
        this.setState({showPanel: panelName})
    }

    deleteExpense = (id) => {
        axios.get(process.env.REACT_APP_EXPENSE_SVC_URL + "/expense/delete?id=" + id, generateAuthHeaders())
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
        const headers = generateAuthHeaders()
        axios.post(process.env.REACT_APP_EXPENSE_SVC_URL + "/expense/create", { 
                id: "",
                location: expense.location,
                amount: expense.amount,
                date: expense.date,
                category: expense.category,
                userId: headers.headers.auth_id
            }, headers)
            .then(res => {
                const newExpense = expense
                newExpense.id = res.data.id
                this.setState({
                    expenses: [...this.state.expenses, newExpense]
                })
            })
            .catch(error =>  {
                this.setState({
                    addErrorMsg: getErrorDisplayMessage(error)
                })
            })
    }

    getExpenseToEdit = (expense) => {
        this.setState({toEdit: expense})
        this.toggleShowPanel('edit')
    }

    editExpense = (expense) => {
        axios.post(process.env.REACT_APP_EXPENSE_SVC_URL + "/expense/modify", expense, 
            generateAuthHeaders())
            .then(res => {
                let expenses = this.state.expenses.filter(e => {
                    return e.id !== expense.id
                })
                this.setState({
                    expenses: [...expenses, expense]
                })
            })
            .catch(error => {
                this.setState({
                    editErrorMsg: getErrorDisplayMessage(error)
                })
            })
    }

    updateFilter = (e) => {
        this.setState({
            filter: e.target.value
        })
    }

    updateSelectedMonth = (month) => {
        this.setState({
            selectedMonth: month
        })
        this.loadExpenseData(month)
    }
    
    render() {

        return (
            <div className="expense-page">
                <div className="expense-header-section">
                    <PageTitle title="Expenses" />

                    <a onClick={() => {this.toggleShowPanel('add')}} 
                        className="add-btn btn-floating btn-medium waves-effect waves-light green">
                    <i className="material-icons">add</i></a>
                    
                    <MonthPicker
                        onChange={(e) => this.updateSelectedMonth(e.target.value)}
                        selectedMonth={this.state.selectedMonth}
                        monthList={this.state.monthList}>
                    </MonthPicker>

                    <input onChange={this.updateFilter}
                        id="filter-input" type='text' placeholder='Search'></input>
                </div>
                
                <ExpenseTable 
                    show={this.state.showPanel === 'table'}
                    loading={this.state.loading}
                    expenses={this.state.expenses}
                    filter={this.state.filter}
                    editExpense={this.getExpenseToEdit}
                    deleteExpense={this.deleteExpense}/>
                <AddExpenseForm 
                    show={this.state.showPanel === 'add'} 
                    toggle={this.toggleShowPanel}
                    addExpense={this.addExpense}
                    errorMsg={this.addErrorMsg}
                />
                <EditExpenseForm 
                    show={this.state.showPanel === 'edit'}
                    expense={this.state.toEdit}
                    toggle={this.toggleShowPanel}
                    editExpense={this.editExpense}
                    errorMsg={this.editErrorMsg}
                />
            </div>
        )
    }
}

export default ExpensePage