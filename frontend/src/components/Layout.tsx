import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, List, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navClass = (path: string) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'border-indigo-600 text-indigo-600'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-indigo-600 p-2 rounded-lg mr-2">
                   <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900">ExpenseTracker</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link to="/" className={navClass('/')}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link to="/expenses" className={navClass('/expenses')}>
                  <List className="w-4 h-4 mr-2" />
                  Expenses
                </Link>
                <Link to="/add" className={navClass('/add')}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Expense
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {user?.username || 'User'}
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
