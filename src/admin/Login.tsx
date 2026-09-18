import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowLeft, AlertCircle, Info } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { error } = await signIn(email, password);

    setIsSubmitting(false);

    if (error) {
      setError(error.message);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-stone-300 dark:border-stone-800 mb-4 bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 dark:text-stone-100">
            Editorial Admin
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-sans">
            Authentication required to manage portfolio content
          </p>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-3.5 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-sm text-xs text-stone-600 dark:text-stone-400 font-sans flex items-start gap-2.5">
            <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-stone-800 dark:text-stone-200">Supabase Credentials Notice</p>
              <p className="mt-1 leading-relaxed">
                Supabase URL &amp; Anon Key are not yet configured in your environment. You can sign in using any email &amp; password (min 4 characters) to test the Admin UI in preview mode, or supply your keys in <code className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded">.env.example</code>.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-sm text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@gdeep.in"
              className="w-full text-sm px-3.5 py-2.5 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 rounded-xs transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-stone-600 dark:text-stone-400 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm px-3.5 py-2.5 bg-transparent border border-stone-300 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-400 outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 rounded-xs transition-colors"
            />
          </div>

          <button
            type="submit"
            id="admin-login-btn"
            disabled={isSubmitting}
            className="w-full mt-2 py-2.5 px-4 text-xs uppercase tracking-wider font-medium text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors rounded-xs disabled:opacity-50"
          >
            {isSubmitting ? 'Verifying...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
