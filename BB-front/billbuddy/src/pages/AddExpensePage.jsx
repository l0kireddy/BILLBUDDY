import React, { useState } from 'react';
import './AddExpensePage.css';

const AddExpensePage = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  // Handle adding an expense
  const handleAddExpense = () => {
    if (expenseName.trim() && expenseAmount.trim() && expenseCategory.trim()) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
      };
      setExpenses([...expenses, newExpense]);

      // Reset expense input fields
      setExpenseName('');
      setExpenseAmount('');
      setExpenseCategory('');
    } else {
      alert('Please fill all the fields');
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="expense-page-container">
      <h2>Add Expense</h2>

      {/* Expense Form */}
      <div className="expense-form">
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <select
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Trip">Trip</option>
        </select>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* Display expenses */}
      <div className="expense-list">
        <h5>Expenses</h5>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
  {expenses.map((expense, index) => (
    <li key={index}>
      {expense.name} - ₹{expense.amount} ({expense.category})
      <button
        onClick={() => handleDeleteExpense(index)}
        className="delete-btn"
      >
        Delete
      </button>
    </li>
  ))}
</ul>
        )}
      </div>
    </div>
  );
};

export default AddExpensePage;
