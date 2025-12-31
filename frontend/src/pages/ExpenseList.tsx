import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Trash2, Search, Filter } from 'lucide-react';

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchExpenses = () => {
    api.get('/expenses').then((res: { data: any[] }) => setExpenses(res.data));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    }
  };

  const filteredExpenses = expenses.filter(expense => 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
      switch(category.toLowerCase()) {
          case 'food': return 'bg-orange-100 text-orange-800';
          case 'transport': return 'bg-blue-100 text-blue-800';
          case 'utilities': return 'bg-yellow-100 text-yellow-800';
          case 'entertainment': return 'bg-purple-100 text-purple-800';
          default: return 'bg-gray-100 text-gray-800';
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and view all your transactions.</p>
        </div>
        <div className="relative w-full sm:w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
             </div>
             <input
                type="text"
                placeholder="Search expenses..."
                className="pl-10 block w-full rounded-lg border-gray-300 bg-white border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                        ${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                            onClick={() => handleDelete(expense.id)} 
                            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                            title="Delete"
                        >
                        <Trash2 className="w-5 h-5" />
                        </button>
                    </td>
                </tr>
                ))}
                {filteredExpenses.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                            <Filter className="w-10 h-10 text-gray-300 mb-2" />
                            <p>No expenses found.</p>
                        </div>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
