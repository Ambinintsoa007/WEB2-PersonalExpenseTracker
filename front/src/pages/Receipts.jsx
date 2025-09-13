"use client";
import { useData } from "../context/DataContext";
import React, { useState } from "react";
import './Receipts.css';

const Receipts = () => {
    const { expenses } = useData();
    const receipts = expenses.filter(expense => expense.receipt);

    const baseUrl = "http://localhost:8080/";

    const [modalOpen, setModalOpen] = useState(false);
    const [modalSrc, setModalSrc] = useState(null);

    const handleViewReceipt = (receipt) => {
        setModalSrc(baseUrl + receipt);
        setModalOpen(true);
    };

    const handleDownloadReceipt = (receipt) => {
        const url = baseUrl + receipt;
        const link = document.createElement('a');
        link.href = url;
        const fileName = receipt.split('/').pop();
        link.download = fileName || "receipt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalSrc(null);
    };

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
                    receipts.map(expense => (
                        <div key={expense.id} className="receipt-card">
                            <div className="receipt-icon">📄</div>
                            <div className="receipt-content">
                                <strong>{expense.receipt.split('/').pop()}</strong>

                                <span className="receipt-expense">{expense.description}</span>

                                <span className="receipt-amount">${expense.amount}</span>

                                <span className="receipt-date">{expense.date}</span>

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

            {modalOpen && (
                <div
                    className="modal-overlay"
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        className="modal-content"
                        onClick={e => e.stopPropagation()}
                        style={{
                            backgroundColor: "#fff",
                            padding: 20,
                            borderRadius: 8,
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            overflow: "auto"
                        }}
                    >
                        {modalSrc.endsWith(".pdf") ? (
                            <iframe
                                src={modalSrc}
                                style={{ width: "80vw", height: "80vh", border: "none" }}
                                title="Receipt PDF"
                            />
                        ) : (
                            <img
                                src={modalSrc}
                                alt="Receipt"
                                style={{ maxWidth: "80vw", maxHeight: "80vh", objectFit: "contain" }}
                            />
                        )}
                        <button
                            onClick={closeModal}
                            style={{ marginTop: 10, padding: "8px 16px", cursor: "pointer" }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Receipts;
