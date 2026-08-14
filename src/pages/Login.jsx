import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="glass-pill p-10 rounded-[3rem] w-full max-w-md border border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-heading font-bold mb-6 text-center">Admin Access 🔐</h1>
        <input 
          type="email" placeholder="Email" className="w-full p-4 mb-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-primary-500"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" className="w-full p-4 mb-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-primary-500"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold hover:scale-105 transition-transform">
          Enter Dashboard
        </button>
      </form>
    </div>
  );
}