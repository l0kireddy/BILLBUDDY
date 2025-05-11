import React, { useState } from 'react';
import './StatementPage.css';
import { jsPDF } from 'jspdf';

const StatementPage = () => {
  const [expenses, setExpenses] = useState([
    { name: 'Food', amount: 500, category: 'Food', date: '2025-05-01' },
    { name: 'Rent', amount: 15000, category: 'Rent', date: '2025-05-05' },
    { name: 'Groceries', amount: 2000, category: 'Groceries', date: '2025-05-07' },
    { name: 'Trip', amount: 10000, category: 'Trip', date: '2025-05-10' },
  ]);

  // Function to handle downloading the statement as a PDF
  const handleDownloadStatement = () => {
    const doc = new jsPDF();
    doc.setFont('Arial', 'normal');
    doc.text('Expense Statement', 20, 20);

    let yOffset = 30;

    // Loop through expenses and add them to the PDF
    expenses.forEach((expense, index) => {
      const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(expense.amount);

      doc.text(
        `${index + 1}. ${expense.name} - ${formattedAmount} - ${expense.category} - ${expense.date}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    // Save the PDF
    doc.save('expense_statement.pdf');
  };

  return (
    <div className="statement-page-container">
      <h2>Expense Statement</h2>

      {/* Expense List */}
      <div className="expense-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Expense Name</th>
              <th>Amount (INR)</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => {
              const formattedAmount = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format(expense.amount);

              return (
                <tr key={index}>
                  <td>{expense.date}</td>
                  <td>{expense.name}</td>
                  <td>{formattedAmount}</td>
                  <td>{expense.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button className="download-btn" onClick={handleDownloadStatement}>
        Download Statement
      </button>
    </div>
  );
};

export default StatementPage;
