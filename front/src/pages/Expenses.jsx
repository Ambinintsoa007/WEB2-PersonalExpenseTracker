"use client"

import { useState } from "react";
import { useData } from "../context/DataContext.jsx";
import '../App.css'

const Expenses = () => {
    const { expenses, categories, addExpense, deleteExpense, updateExpense } = useData();
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        type: "",
        description: "",
        receipt: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.amount && formData.category && formData.description) {
            if(editingExpense) {
                updateExpense(editingExpense.id, formData)
                setEditingExpense(null)
            } else {
                addExpense(formData)
            }
            setFormData({
                amount:  "",
                category: "",
                type: "",
                description: "",
                receipt: ""
            })
            setShowForm(false);
        }
    }

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setFormData({
            amount: expense.amount,
            category: expense.category,
            type: expense.type,
            description: expense.description,
            receipt: expense.receipt || "",
        })
        setShowForm(true)
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this expense?")) {
            deleteExpense(id)
        }
    }

    const handleCancel = () => {
        setShowForm(false);
        setEditingExpense(null);
        setFormData({
            amount: "",
            category: "",
            type: "",
            description: "",
            receipt: ""
        })
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className="expenses">
            <div className="page-header">
                <h1>Expenses</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add Expense"}
                </button>
            </div>

            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="expense-form">
                        <h3>{editingExpense ? "Edit Expense" : "Add New Expense"}</h3>
                        <div className="form-group">
                            <label>Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleInputChange} required={true}>
                                <option value="" >Select Category</option>
                                {categories.map((category) => (
                                    <option value={category} key={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter description"
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>Receipt</label>
                            <input
                                type="text"
                                name="receipt"
                                value={formData.receipt}
                                onChange={handleInputChange}
                                placeholder="Receipt filename"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-success">
                                {editingExpense ? "Update Expense" : "Add Expense"}
                            </button>
                            {editingExpense && (
                                <button type="button" className="btn btn-secondary" style={{marginLeft: '1.5rem'}} onClick={handleCancel}>
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Receipt</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td className="amount">${expense.amount}</td>
                            <td>{expense.date}</td>
                            <td>
                                <span className="category-badge">
                                    {expense.category}
                                </span>
                            </td>
                            <td>{expense.type}</td>
                            <td>{expense.description}</td>
                            <td>
                                {expense.receipt ? (
                                    <span className="receipt-link">
                                        📄{expense.receipt}
                                    </span>
                                ) : (
                                    <span className="no-receipt">No receipt</span>
                                )}
                            </td>
                            <td className="actions">
                                <button className="btn btn-sm btn-edit" onClick={() => handleEdit(expense)}>
                                    ✏️
                                </button>
                                <button className="btn btn-sm btn-edit" onClick={() => handleDelete(expense.id)} title="Delete expense">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Expenses;