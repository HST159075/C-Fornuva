import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from '@/components/ui/Icons';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuthStore();
  const router = useRouter();

  const handleDemoLogin = (role: 'admin' | 'user' | 'manager') => {
    if (role === 'admin') {
      setValue('email', 'admin@furnova.com');
      setValue('password', 'admin1234');
    } else if (role === 'manager') {
      setValue('email', 'manager@furnova.com');
      setValue('password', 'manager1234');
    } else {
      setValue('email', 'user@furnova.com');
      setValue('password', 'user1234');
    }
  };

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await login(data);
      toast.success('Welcome back!');
      router.push('/');
    } catch (err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Login failed');
    }
  };

  const socialAuthBase = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const origin = apiBase.replace(/\/api\/?$/, '');
    return `${origin}/api/auth`;
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const callbackURL = window.location.origin;
      const res = await fetch(`${socialAuthBase()}/sign-in/social`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, callbackURL }),
        credentials: 'include',
      });
      const data = (await res.json()) as { url?: string; message?: string };
      if (!res.ok || !data.url) throw new Error(data.message || 'Social login failed');
      window.location.href = data.url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Social login failed';
      toast.error(msg);
    }
  };

  return (
    <Layout title="Login | FurNova">
      <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] shadow-xl border border-[var(--border)]"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--secondary)]">Welcome Back</h2>
            <p className="mt-2 text-[var(--muted)]">Please enter your details to sign in</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--muted)] mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    className="block w-full pl-10 pr-3 py-3 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--muted)] mb-2">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                    type="password"
                    className="block w-full pl-10 pr-3 py-3 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message as string}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[var(--primary)] rounded border-gray-300 focus:ring-[var(--primary)]" />
                <label className="ml-2 block text-sm text-[var(--muted)]">Remember me</label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-[var(--primary)] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
              {!isSubmitting && <ArrowRight size={18} />}
            </button>

            {/* Demo Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-2.5 text-[10px] font-bold bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all border border-gray-200"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('manager')}
                className="py-2.5 text-[10px] font-bold bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all border border-gray-200"
              >
                Manager
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('user')}
                className="py-2.5 text-[10px] font-bold bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all border border-gray-200"
              >
                User
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[var(--muted)] uppercase tracking-wider text-xs">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center px-4 py-3 border border-[var(--border)] rounded-xl hover:bg-gray-50 transition-colors"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center px-4 py-3 border border-[var(--border)] rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Github size={20} className="mr-2" />
              <span className="text-sm font-medium">Github</span>
            </button>
          </div>

          <p className="text-center text-sm text-[var(--muted)]">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-bold text-[var(--primary)] hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoginPage;
