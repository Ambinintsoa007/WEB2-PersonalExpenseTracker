





const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

const users = []
const expenses = []
const categories = [
    { id: '1', name: 'Food' },
    { id: '2', name: 'Transport' },
    { id: '3', name: 'Entertainment'}
 ]

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.post('/api/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
       id: Date.now().toString()
   },
         email: email,
        password: hashedPassword
    }

    users.push(newUser);
res.status(201).json({message: 'new user created'});
})

// app.post('/api/auth/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find(user => user.email === email);
//     if(!user) {
//         res.status(401).json({message: 'user not found'})
//     }

//     const comparedPassword = await bcrypt.compare(password, user.password);

//     if(comparedPassword){
//         const token = jwt.sign(
//             {
//                 userId: user.id,
//                 email: email
//             }, 'AZERTYUIOP')
//         res.json(token)
//     }
//     else {
//         res.status(401).json({message: 'wrong password'})
//     }
// })

// //-----------middleware--------------
// const authenticateToken = (req, res, next) => {
//     const header = req.headers['authorization'];
//     const token = header && header.split(' ')[1];

//     if(!token) {
//         res.status(401).json({message: 'wrong token'})
//     }

//     try {
//         const verifyToken = jwt.verify(token, 'AZERTYUIOP');
//         req.user = verifyToken;
//         next();
//     } catch (error) {
//         return res.status(401).json({error: 'wrong token'})
//     }
// }
// //------------------------------------

// app.post('/api/expenses',authenticateToken, async (req, res) => {
//     const {amount, date, categoryId, description,type} = req.body;
//     const newExpense = {
//         id: Date.now().toString(),
//         userId: req.user.userId,
//         amount: amount,
//         date: date,
//         categoryId: categoryId,
//         description: description,
//         type: type,
//         creationDate: new Date(),
//     }
//     expenses.push(newExpense)
//     res.json(expenses)
// })

// app.get('/api/expenses', authenticateToken, async (req, res) => {
//     const userExpense = expenses.filter(e => e.userId === req.user.userId);
//     res.json(userExpense)
// })

// app.put('/api/expenses/:id', authenticateToken , async (req, res) => {
//     const expenseId = req.params.id;
//     const findExpense = expenses.find(expense => expense.id === expenseId);

//     if(!findExpense) {
//         return res.status(404).json({message: 'expense not found'})
//     }
//     if(findExpense.userId !== req.user.userId) {
//         return res.status(403).json({message: 'not your expense'})
//     }

//     try{
//         const {amount, date, categoryId, description} = req.body;
//         findExpense.amount = amount || amount
//         findExpense.date = date || date
//         findExpense.categoryId = categoryId || categoryId
//         findExpense.description = description || description

//         res.json(findExpense)
//     }
//     catch (error) {
//         res.status(404).json({error: "expense can't be updated"})
//     }
// })

// app.delete('/api/expenses/:id', authenticateToken , async (req, res) => {
//     const expenseId = req.params.id;
//     const findExpense = expenses.find(expense => expense.id === expenseId);

//     if(!findExpense) {
//         return res.status(404).json({message: 'expense not found'})
//     }
//     if(findExpense.userId !== req.params.categoryId) {
//         return res.status(403).json({message: 'not your expense'})
//     }

//     try {
//         const index = expenses.findIndex(e => e.id === expenseId)
//         expenses.splice(index, 1)
//     } catch (error) {
//         res.status(404).json({error: "expense can't be removed"})
//     }
// })

// app.get('/api/receipts/:idExpenseId', authenticateToken, async (req, res) => {

// })

// console.log("server running on 3000")
// app.listen(3000);