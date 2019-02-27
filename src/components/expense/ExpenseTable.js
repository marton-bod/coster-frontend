import React, { Component } from 'react';

class ExpenseTable extends Component {
      
    render() {
        if (!this.props.show) {
            return null
        }

        let expenses;
        if (this.props.expenses.length > 0) {
            expenses = this.props.expenses.map( e => {
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
            expenses = ( <tr><td>No expenses</td></tr>)
        }
        
        return (
            <div className="expense-panel">
                <table className="expense-table">
                    <thead className="expense-table-header">
                        <tr>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Category</th>
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