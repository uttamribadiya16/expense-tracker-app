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
    <div className="min-h-screen bg-base-100 flex flex-col font-sans text-base-content">
      <nav className="navbar bg-base-200 shadow-md">
        <div className="app-container w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg text-primary-content">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">ExpenseTracker</span>
            <div className="hidden sm:flex sm:space-x-2 ml-6">
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

          <div className="flex items-center space-x-3">
            <div className="badge badge-primary badge-outline">{user?.username || 'User'}</div>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 app-container p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
