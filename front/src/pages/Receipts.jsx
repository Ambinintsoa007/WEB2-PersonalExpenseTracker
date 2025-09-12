"use client"
import { useData } from "../context/DataContext"
import '../App.css'

const Receipts = () => {
    const { expenses } = useData()

    const receipts = expenses.filter((expense) => expense.receipt)

    const handleViewReceipt = (receipt) => {
        alert(`Viewing receipt: ${receipt}`)
    }

    const handleDownloadReceipt = (receipt) => {
        alert(`Downloading receipt: ${receipt}`)
    }

    return (
        <div className="receipts">
            <div className="page-header">
                <h1>Receipts</h1>
                <p>Manage your expense receipts</p>
            </div>

            <div className="receipts-grid">
                {receipts.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📄</div>
                        <h3>No receipts found</h3>
                        <p>Add receipts to your expenses to see them here</p>
                    </div>
                ) : (
                    receipts.map((expense) => (
                        <div key={expense.id} className="receipt-card">
                            <div className="receipt-icon">📄</div>
                            <div className="receipt-content">
                                <h4>{expense.receipt}</h4>
                                <p className="receipt-expense">{expense.description}</p>
                                <p className="receipt-amount">${expense.amount}</p>
                                <p className="receipt-date">{expense.date}</p>
                                <div className="receipt-actions">
                                    <button className="btn btn-sm btn-primary" onClick={() => handleViewReceipt(expense.receipt)}>
                                        View
                                    </button>
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleDownloadReceipt(expense.receipt)}>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Receipts
