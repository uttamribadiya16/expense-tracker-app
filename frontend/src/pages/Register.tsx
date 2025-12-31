import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Wallet } from 'lucide-react';

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/register', data);
      login(response.data.token, response.data);
      navigate('/');
    } catch (error: any) {
        console.error(error);
      alert('Registration failed: ' + (error.response?.data || 'Unknown error'));
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
        <h2 className="mt-6 text-center text-3xl font-extrabold">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card shadow-lg">
          <div className="card-body">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
               <div>
                <label className="label"><span className="label-text">Username</span></label>
                <input
                  type="text"
                  {...register('username', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label"><span className="label-text">Email address</span></label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label"><span className="label-text">Password</span></label>
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="input input-bordered w-full"
                />
                 {errors.password && <p className="text-red-500 text-xs mt-1">Min length 6</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? 'Creating account...' : 'Sign up'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
                <Link to="/login" className="link link-primary">Already have an account? Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
