
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';

const initialTransactions: Transaction[] = [
  { id: '1', category: 'Salary', amount: 3500, date: '2024-07-01', type: TransactionType.Income },
  { id: '2', category: 'Rent', amount: 1200, date: '2024-07-02', type: TransactionType.Expense },
  { id: '3', category: 'Groceries', amount: 150.75, date: '2024-07-05', type: TransactionType.Expense },
  { id: '4', category: 'Freelance', amount: 400, date: '2024-07-10', type: TransactionType.Income },
];

export const FinanceTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.Income)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.Expense)
    .reduce((acc, t) => acc + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-100 p-6 rounded-xl shadow-sm border border-green-200">
                <p className="text-sm text-green-700">Total Income</p>
                <p className="text-3xl font-bold text-green-800">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-red-100 p-6 rounded-xl shadow-sm border border-red-200">
                <p className="text-sm text-red-700">Total Expense</p>
                <p className="text-3xl font-bold text-red-800">${totalExpense.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-sm border border-blue-200">
                <p className="text-sm text-blue-700">Balance</p>
                <p className="text-3xl font-bold text-blue-800">${balance.toFixed(2)}</p>
            </div>
       </div>

      <div className="bg-surface p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-on-surface">Recent Transactions</h3>
          <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Add Transaction
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-muted">Category</th>
                <th className="py-3 px-4 text-sm font-semibold text-muted">Date</th>
                <th className="py-3 px-4 text-sm font-semibold text-muted text-right">Amount</th>
                <th className="py-3 px-4 text-sm font-semibold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-on-surface">{t.category}</td>
                  <td className="py-3 px-4 text-muted">{t.date}</td>
                  <td className={`py-3 px-4 font-semibold text-right ${t.type === TransactionType.Income ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === TransactionType.Income ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
