import React, { useState } from 'react';

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('2024-09');
    const [dateRange, setDateRange] = useState('Month');


    const monthlyData = {
        totalIncome: 4500.00,
        totalExpenses: 3750.25,
        remainingBalance: 749.75,
        budgetExceeded: false,
        exceededAmount: 0
    };

    const handleDateRangeChange = (range) => {
        setDateRange(range);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            margin: 0,
            padding: 0
        },
        header: {
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        },
        headerLeft: {
            display: 'flex',
            alignItems: 'center',
            gap: '3rem'
        },
        appTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            margin: 0
        },
        mainNav: {
            display: 'flex',
            gap: '2rem'
        },
        navLink: {
            textDecoration: 'none',
            color: '#64748b',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s'
        },
        navLinkActive: {
            color: '#3b82f6',
            borderBottomColor: '#3b82f6'
        },
        headerRight: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        searchInput: {
            padding: '0.5rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            width: '300px',
            fontSize: '0.9rem'
        },
        userAvatar: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        main: {
            padding: '2rem',
            maxWidth: '1400px',
            margin: '0 auto'
        },
        titleSection: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        dashboardTitle: {
            fontSize: '2rem',
            color: '#1e293b',
            margin: 0
        },
        dateFilters: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
        },
        filterBtn: {
            padding: '0.5rem 1rem',
            border: '1px solid #e2e8f0',
            background: 'white',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
        },
        filterBtnActive: {
            background: '#3b82f6',
            color: 'white',
            borderColor: '#3b82f6'
        },
        customDateRange: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginLeft: '1rem'
        },
        dateInput: {
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            fontSize: '0.9rem'
        },
        budgetAlert: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500'
        },
        summaryCards: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        },
        summaryCard: {
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s'
        },
        summaryCardPrimary: {
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            color: 'white'
        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
        },
        cardTitle: {
            fontSize: '0.9rem',
            fontWeight: '500',
            opacity: 0.8,
            margin: 0
        },
        cardIcon: {
            fontSize: '1.5rem'
        },
        cardValue: {
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        },
        cardChange: {
            fontSize: '0.8rem',
            fontWeight: '500'
        },
        cardChangePositive: {
            color: '#059669'
        },
        cardChangeNegative: {
            color: '#dc2626'
        },
        cardChangeNeutral: {
            color: '#64748b'
        },
        chartsSection: {
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '1.5rem',
            marginBottom: '2rem'
        },
        chartContainer: {
            background: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        },
        chartHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
        },
        chartTitle: {
            fontSize: '1.1rem',
            color: '#1e293b',
            margin: 0
        },
        chartBtn: {
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.375rem'
        },
        chartPlaceholder: {
            height: '300px',
            border: '2px dashed #e2e8f0',
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
        },
        recentActivity: {
            background: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
        },
        activityHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
        },
        activityTitle: {
            fontSize: '1.1rem',
            color: '#1e293b',
            margin: 0
        },
        viewAllBtn: {
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            fontWeight: '500',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.375rem'
        },
        activityList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        activityItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            transition: 'background-color 0.2s'
        },
        activityIcon: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
        },
        activityIconExpense: {
            background: 'rgba(239, 68, 68, 0.1)'
        },
        activityIconIncome: {
            background: 'rgba(34, 197, 94, 0.1)'
        },
        activityDetails: {
            flex: 1
        },
        activityTransactionTitle: {
            fontWeight: '500',
            color: '#1e293b',
            marginBottom: '0.25rem'
        },
        activityMeta: {
            fontSize: '0.85rem',
            color: '#64748b'
        },
        activityAmount: {
            fontWeight: 'bold',
            fontSize: '1rem'
        },
        activityAmountExpense: {
            color: '#dc2626'
        },
        activityAmountIncome: {
            color: '#059669'
        },
        quickActions: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        quickActionBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            border: '1px solid #e2e8f0',
            background: 'white',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
            color: '#475569',
            textDecoration: 'none',
            transition: 'transform 0.2s'
        },
        quickActionBtnPrimary: {
            background: '#3b82f6',
            color: 'white',
            borderColor: '#3b82f6'
        },
        actionIcon: {
            fontSize: '1.1rem'
        }
    };

    return (
        <div style={styles.container}>

            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.appTitle}>ExpenseTracker</h1>
                    <nav style={styles.mainNav}>
                        <a href="/dashboard" style={{...styles.navLink, ...styles.navLinkActive}}>Dashboard</a>
                        <a href="/expenses" style={styles.navLink}>Expenses</a>
                        <a href="/incomes" style={styles.navLink}>Incomes</a>
                        <a href="/categories" style={styles.navLink}>Categories</a>
                    </nav>
                </div>
                <div style={styles.headerRight}>
                    <div>
                        <input type="text" placeholder="Search..." style={styles.searchInput} />
                    </div>
                    <div>
                        <div style={styles.userAvatar}>U</div>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <main style={styles.main}>
                <div style={styles.titleSection}>
                    <h2 style={styles.dashboardTitle}>Dashboard</h2>
                    <div style={styles.dateFilters}>
                        <button
                            style={dateRange === 'Day' ? {...styles.filterBtn, ...styles.filterBtnActive} : styles.filterBtn}
                            onClick={() => handleDateRangeChange('Day')}
                        >
                            Day
                        </button>
                        <button
                            style={dateRange === 'Week' ? {...styles.filterBtn, ...styles.filterBtnActive} : styles.filterBtn}
                            onClick={() => handleDateRangeChange('Week')}
                        >
                            Week
                        </button>
                        <button
                            style={dateRange === 'Month' ? {...styles.filterBtn, ...styles.filterBtnActive} : styles.filterBtn}
                            onClick={() => handleDateRangeChange('Month')}
                        >
                            Month
                        </button>
                        <button
                            style={dateRange === 'Year' ? {...styles.filterBtn, ...styles.filterBtnActive} : styles.filterBtn}
                            onClick={() => handleDateRangeChange('Year')}
                        >
                            Year
                        </button>
                        <div style={styles.customDateRange}>
                            <input type="date" style={styles.dateInput} />
                            <span>-</span>
                            <input type="date" style={styles.dateInput} />
                        </div>
                    </div>
                </div>

                {/* Alert Section */}
                {monthlyData.budgetExceeded && (
                    <div style={styles.budgetAlert}>
                        ⚠️ You've exceeded your budget for this month by ${monthlyData.exceededAmount.toFixed(2)}
                    </div>
                )}

                {/* Summary Cards */}
                <div style={styles.summaryCards}>
                    <div style={{...styles.summaryCard, ...styles.summaryCardPrimary}}>
                        <div style={styles.cardHeader}>
                            <h3 style={{...styles.cardTitle, color: '#e2e8f0'}}>Total Income</h3>
                            <div style={styles.cardIcon}>💰</div>
                        </div>
                        <div style={styles.cardValue}>${monthlyData.totalIncome.toFixed(2)}</div>
                        <div style={{...styles.cardChange, color: '#34d399'}}>+2.5% from last month</div>
                    </div>

                    <div style={styles.summaryCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Total Expenses</h3>
                            <div style={styles.cardIcon}>💸</div>
                        </div>
                        <div style={styles.cardValue}>${monthlyData.totalExpenses.toFixed(2)}</div>
                        <div style={{...styles.cardChange, ...styles.cardChangeNegative}}>+8.2% from last month</div>
                    </div>

                    <div style={styles.summaryCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Remaining Balance</h3>
                            <div style={styles.cardIcon}>💵</div>
                        </div>
                        <div style={styles.cardValue}>${monthlyData.remainingBalance.toFixed(2)}</div>
                        <div style={{...styles.cardChange, ...styles.cardChangePositive}}>+15.3% from last month</div>
                    </div>

                    <div style={styles.summaryCard}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Recurring Expenses</h3>
                            <div style={styles.cardIcon}>🔁</div>
                        </div>
                        <div style={styles.cardValue}>12</div>
                        <div style={{...styles.cardChange, ...styles.cardChangeNeutral}}>No change</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={styles.chartsSection}>
                    <div style={styles.chartContainer}>
                        <div style={styles.chartHeader}>
                            <h3 style={styles.chartTitle}>Monthly Spending Overview</h3>
                            <button style={styles.chartBtn}>📊</button>
                        </div>
                        <div style={styles.chartPlaceholder}>
                            <p style={{margin: '0 0 0.5rem 0', fontWeight: '500'}}>Bar Chart Container</p>
                            <small style={{opacity: 0.7}}>Monthly spending over time will be displayed here</small>
                        </div>
                    </div>

                    <div style={styles.chartContainer}>
                        <div style={styles.chartHeader}>
                            <h3 style={styles.chartTitle}>Expense Categories</h3>
                        </div>
                        <div style={styles.chartPlaceholder}>
                            <p style={{margin: '0 0 0.5rem 0', fontWeight: '500'}}>Pie Chart Container</p>
                            <small style={{opacity: 0.7}}>Expense breakdown by category will be displayed here</small>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div style={styles.recentActivity}>
                    <div style={styles.activityHeader}>
                        <h3 style={styles.activityTitle}>Recent Transactions</h3>
                        <button style={styles.viewAllBtn}>View All</button>
                    </div>
                    <div style={styles.activityList}>
                        <div style={styles.activityItem}>
                            <div style={{...styles.activityIcon, ...styles.activityIconExpense}}>💸</div>
                            <div style={styles.activityDetails}>
                                <div style={styles.activityTransactionTitle}>Grocery Shopping</div>
                                <div style={styles.activityMeta}>Food & Dining • Today</div>
                            </div>
                            <div style={{...styles.activityAmount, ...styles.activityAmountExpense}}>-$45.30</div>
                        </div>
                        <div style={styles.activityItem}>
                            <div style={{...styles.activityIcon, ...styles.activityIconIncome}}>💰</div>
                            <div style={styles.activityDetails}>
                                <div style={styles.activityTransactionTitle}>Salary Deposit</div>
                                <div style={styles.activityMeta}>Income • 2 days ago</div>
                            </div>
                            <div style={{...styles.activityAmount, ...styles.activityAmountIncome}}>+$2,500.00</div>
                        </div>
                        <div style={styles.activityItem}>
                            <div style={{...styles.activityIcon, ...styles.activityIconExpense}}>🚗</div>
                            <div style={styles.activityDetails}>
                                <div style={styles.activityTransactionTitle}>Gas Station</div>
                                <div style={styles.activityMeta}>Transportation • 3 days ago</div>
                            </div>
                            <div style={{...styles.activityAmount, ...styles.activityAmountExpense}}>-$35.00</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={styles.quickActions}>
                    <button style={{...styles.quickActionBtn, ...styles.quickActionBtnPrimary}}>
                        <span style={styles.actionIcon}>➕</span>
                        Add Expense
                    </button>
                    <button style={styles.quickActionBtn}>
                        <span style={styles.actionIcon}>💰</span>
                        Add Income
                    </button>
                    <button style={styles.quickActionBtn}>
                        <span style={styles.actionIcon}>📁</span>
                        Upload Receipt
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;