

-- Supprimer les tables si elles existent déjà (pour repartir propre)
DROP TABLE IF EXISTS receipts CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS incomes CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

--     =========================
--               Table Users
--     =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
--  Table Categories
-- =========================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('expense', 'income')) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_default BOOLEAN DEFAULT FALSE,
    type SET DEFAULT 'default'
);

-- =========================
--  Table Incomes
-- =========================
CREATE TABLE incomes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    amount NUMERIC(10,2) NOT NULL,
    description TEXT,
    date TIMESTAMP DEFAULT NOW(),
    is_recurring BOOLEAN DEFAULT FALSE,
    source  TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
--  Table Expenses
-- =========================
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    amount NUMERIC(10,2) NOT NULL,
    description TEXT,
    date TIMESTAMP DEFAULT NOW(),
    is_recurring BOOLEAN DEFAULT FALSE,
    type VARCHAR(20) DEFAULT 'one-time',
    start_date DATE,
    end_date DATE

);

-- =========================
--  Table Receipts
-- =========================
CREATE TABLE receipts (
    id SERIAL PRIMARY KEY,
    expense_id INT REFERENCES expenses(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- =========================
--  Indexes (pour performance)
-- =========================
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_expenses_user ON expenses(user_id);
CREATE INDEX idx_incomes_user ON incomes(user_id);

-- =========================
--  Données de test
-- =========================
INSERT INTO users (email, password) VALUES
('test@example.com', 'hashed_password');

INSERT INTO categories (user_id, name, is_default, type)
VALUES 
(1, 'Food', TRUE, 'expense'),
(1, 'Transport', TRUE, 'expense'),
(1, 'Entertainment', TRUE, 'expense');


INSERT INTO incomes (user_id, category_id, amount, description)
VALUES (1, 1, 1500.00, 'Salaire mensuel');

INSERT INTO expenses (user_id, category_id, amount, description)
VALUES
(1, 2, 50.00, 'Courses au supermarché'),
(1, 3, 20.00, 'Taxi');
