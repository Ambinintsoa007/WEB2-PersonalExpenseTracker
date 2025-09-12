"use client"

import { useState } from "react";
import { useData } from "../context/DataContext.jsx";
import '../App.css'

const Categories = () => {
    const { categories, addCategory, deleteCategory } = useData();
    const [newCategory, setNewCategory] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if(newCategory.trim() && !categories.includes(newCategory.trim())) {
            addCategory(newCategory.trim())
            setNewCategory("")
        }
    }
    const handleDeleteCategory = (category) => {
        if(window.confirm(`Are you sure you want to delete this category? "${category}"`)) {
            deleteCategory(category);
        }
    }

    return (
        <div className="categories">
            <div className="page-header">
                <h1>Categories</h1>
                <p>Mange your expense categories</p>
            </div>

            <div className="add-category-form">
                <form  onSubmit={handleAddCategory}
                       className="category-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter the  newe category name"
                            className="category-input"
                        />
                        <button type="submit" className="btn btn-primary">Add Category</button>
                    </div>
                </form>
            </div>

            <div className="xategories-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <div className="category-content">
                            <h3>{category}</h3>
                            <div className="category-actions">
                                <button className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteCategory(category)}>Delete</button>
                                <button className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteCategory(category)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Categories;