import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Wallet } from 'lucide-react';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      login(response.data.token, response.data);
      navigate('/');
    } catch (error: any) {
        console.error(error);
      alert('Login failed: ' + (error.response?.data || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="bg-primary p-3 rounded-xl text-primary-content">
                <Wallet className="w-10 h-10" />
            </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to ExpenseTracker</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card shadow-lg">
          <div className="card-body">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label"><span className="label-text">Email address</span></label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
              </div>

              <div>
                <label className="label"><span className="label-text">Password</span></label>
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
                <Link to="/register" className="link link-primary">Create new account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
