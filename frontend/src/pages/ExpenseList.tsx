import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Trash2 } from 'lucide-react';

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  const fetchExpenses = () => {
    api.get('/expenses').then((res: { data: any[] }) => setExpenses(res.data));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Expense List</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-indigo-600 truncate">{expense.description}</p>
                <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()} - {expense.category}</p>
              </div>
              <div className="flex items-center">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-4">
                  ${expense.amount.toFixed(2)}
                </span>
                <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
          {expenses.length === 0 && (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No expenses found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;
