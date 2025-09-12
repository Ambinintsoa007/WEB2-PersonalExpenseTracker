"use client"

const Navbar = ({ darkMode, setDarkMode, currentPage, setCurrentPage }) => {
    const navItems = [
        { path: "dashboard", label: "Dashboard" },
        { path: "expenses", label: "Expenses" },
        { path: "incomes", label: "Incomes" },
        { path: "categories", label: "Categories" },
        { path: "receipts", label: "Receipts" },
        {path: "profile", label: "Profile" }
    ]

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2 >💰 Mi-Kajy</h2>
            </div>
            <ul className="navbar-nav">
                {navItems.map((item) => (
                    <li key={item.path} className="nav-item">
                        <button onClick={() => setCurrentPage(item.path)}
                                className={`nav-link ${currentPage === item.path ? "active" : ""}`}>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar