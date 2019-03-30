import React, { Component } from 'react';

class ExpenseTable extends Component {

    state = {
        sortKey: "date",
        ascending: false
    }

    updateSortKey(newKey) {
        if (newKey === this.state.sortKey) {
            this.setState({
                ascending: !this.state.ascending
            })
        } else {
            this.setState({
                sortKey: newKey,
                ascending: true
            })
        }
    }

    anyFieldIncludesFilter = (expense) => {
        const filter = this.props.filter.toLowerCase();
        return expense.location.toLowerCase().includes(filter) ||
                expense.date.toLowerCase().includes(filter) ||
                expense.category.toLowerCase().includes(filter) ||
                expense.amount.toString().toLowerCase().includes(filter);
    }
      
    render() {
        if (!this.props.show) {
            return null
        }

        let expenses;
        if (this.props.expenses.length > 0) {
            expenses = this.props.expenses
                .filter(e => { return this.anyFieldIncludesFilter(e)})
                .sort((a, b) => { 
                    const x = a[this.state.sortKey]; 
                    const y = b[this.state.sortKey];
                    if (this.state.ascending) {
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    } else {
                        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                    }
                })
                .map( e => {
                    return (
                        <tr className="expense-item" key={e.id}>
                            <td>{ e.location }</td>
                            <td>{ e.amount } </td>
                            <td>{ e.date }</td>
                            <td>{ e.category }</td>
                            <td><button className="btn" onClick={() => {this.props.editExpense(e)}}>
                                <i className="material-icons">edit</i></button></td>
                            <td><button className="btn red" onClick={() => {this.props.deleteExpense(e.id)}}>
                                <i className="material-icons">delete</i></button></td>
                        </tr>
                    )
                })
        } else { 
            expenses = ( <h4>No expenses</h4>)
        }
        
        return (
            <div className="expense-panel">
                <table className="expense-table">
                    <thead className="expense-table-header">
                        <tr>
                            <th onClick={() => {this.updateSortKey("location")}}>Location</th>
                            <th onClick={() => {this.updateSortKey("amount")}}>Amount</th>
                            <th onClick={() => {this.updateSortKey("date")}}>Date</th>
                            <th onClick={() => {this.updateSortKey("category")}}>Category</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { expenses }
                    </tbody>                    
                </table>
            </div>
        )
    }
}

export default ExpenseTable