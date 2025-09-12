import { useData  } from "../context/DataContext.jsx";
import '../App.css'

const Dashboard = () => {
    const { getTotalIncome, getTotalExpenses, getRemainingBalance, expenses } = useData();

    const totalIncome = getTotalIncome();
    const totaExpenses = getTotalExpenses();
    const balance = getRemainingBalance();

    const getBudgetAlert = () => {
        if(balance < 0){
            return {type: "danger", message: "You are over budget!"}
        } else if(balance < totalIncome * 0.1){
            return { type: "warning", message: "Low balance warning!"}
        }
        return { type: "success", message: "Budget is healthy!"}
    }

    const alert = getBudgetAlert()

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Overview of your financial status</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card income">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                        <h3>Total Income</h3>
                        <p className="stat-value">${totalIncome.toFixed(2)}</p>
                    </div>
                </div>

                <div className="stat-card expense">
                    <div className="stat-icon">📉</div>
                    <div className="stat-content">
                        <h3>Total Expenses</h3>
                        <p className="stat-value">${totaExpenses.toFixed(2)}</p>
                    </div>
                </div>

                <div className="stat-card balance">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3>Remaining Balance</h3>
                        <p className={`stat-value ${balance < 0 ? "negative" : "positive"}`}>${balance.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="alert-section">
                <div className={`alert alert-${alert.type}`}>
                    <span className="alert-icon">{alert.type === "danger" ? "⚠️" : alert.type === "warning" ? "⚡ " : "✅ "}</span>
                    {alert.message}
                </div>
            </div>

            <div className="charts-section">
                <div className="chart-container full-width">
                    <h3>Monthly Expenses</h3>
                    <div className="chart-container"><p>Eto le bar chart</p></div>
                </div>

                <div className="chart-container full-width">
                    <h3>Expense Categories</h3>
                    <div className="chart-container"><p>Eto le pie chart</p></div>
                </div>
            </div>

            <div className="recent-transactions">
                <h3>Recent Transactions</h3>
                <div className="transaction-list">
                    {expenses.slice(-5).map((expense) => (
                        <div key={expense.id} className="transaction-item">
                            <div className="transaction-info">
                                <span className="transaction-category">{expense.category}</span>
                                <span className="transaction-description">{expense.description}</span>
                            </div>
                            <div className="transaction-amount">-${expense.amount}</div>
                            <div className="transaction-date">{expense.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;