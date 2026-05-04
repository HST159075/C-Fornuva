import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, Github } from '@/components/ui/Icons';
import Layout from '@/components/layout/Layout';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { register: signUp } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await signUp(data);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Registration failed');
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
    <Layout title="Register | FurNova">
      <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] shadow-xl border border-[var(--border)]"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--secondary)]">Create Account</h2>
            <p className="mt-2 text-[var(--muted)]">Join FurNova for premium furniture deals</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--muted)] mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <UserIcon size={18} />
                  </span>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message as string}</p>}
              </div>

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

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input required type="checkbox" className="h-4 w-4 text-[var(--primary)] rounded border-gray-300 focus:ring-[var(--primary)]" />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-[var(--muted)]">
                  I agree to the <Link href="/terms" className="text-[var(--primary)] font-medium hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[var(--primary)] font-medium hover:underline">Privacy Policy</Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[var(--muted)] uppercase tracking-wider text-xs">Or sign up with</span>
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
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-[var(--primary)] hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
