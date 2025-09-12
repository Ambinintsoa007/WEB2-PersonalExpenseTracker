"use client"


import { useState } from "react";
import { useData } from "../context/DataContext.jsx";
import '../App.css'

const Incomes = () => {
    const { incomes, addIncome, updateIncome, deleteIncome } = useData();
    const [showForm, setshowForm] = useState(false)
    const [editingIncome, setEditingIncome] = useState(null);
    const [formData, setFormData] = useState({
        amount: "",
        source: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if( formData.amount && formData.source && formData.description) {
            if(editingIncome) {
                updateIncome(editingIncome.id, formData);
                setEditingIncome(null);
            }else{
                addIncome(formData)
            }
            setFormData({
                amount: "",
                source: "",
                description: ""
            })
            setshowForm(false)
        }
    }

    const handleEdit = (income) => {
        setEditingIncome(income)
        setFormData({
            amount: income.amount,
            source: income.source,
            description: income.description
        })
        setshowForm(true)
    }

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this incmoe ?')){
            deleteIncome(id);
        }
    }

    const handleCancel = () => {
        setshowForm(false)
        setEditingIncome(null);
        setFormData({

            amount: "",
            source: "",
            description: ""
        })
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="incomes">
            <div className="page-header">
                <h1>Incomes</h1>
                <button className="btn btn-primary" onClick={() => setshowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add income"}
                </button>
            </div>

            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="income-form">
                        <h3>{editingIncome ? "Edit Income" : "Add Nex Income"}</h3>
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
                            <label>Source</label>
                            <input
                                type="text"
                                name="source"
                                value={formData.source}
                                onChange={handleInputChange}
                                placeholder={"eg: Salary, Freelance, Investment, Gambling"}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder={"Enter description (optional)"}
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-success">
                                {editingIncome ? "Update Income" : "Add Income"}
                            </button>
                            {editingIncome && (
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
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
                        <th>Source</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {incomes.map((income) => (
                        <tr key={income.id}>
                            <td className="amount income-amount">+${income.amount}</td>
                            <td>{income.date}</td>
                            <td>
                                <span className="source-badge">{income.source}</span>
                            </td>
                            <td>{income.description}</td>
                            <td className="actions">
                                <button className="btn btn-sm btn-edit" onClick={() => handleEdit(income)}>
                                    ✏️
                                </button>
                                <button className="btn btn-sm btn-delete" onClick={() => handleDelete(income.id)} title="Delete uncome">
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

export default Incomes;