import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  isDemoAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_demo_admin') === 'true';
  });

  useEffect(() => {
    let mounted = true;

    if (!isSupabaseConfigured) {
      if (isDemoAdmin) {
        setUser({
          id: 'demo-admin-id',
          email: 'admin@gdeep.in',
          app_metadata: {},
          user_metadata: { name: 'Admin' },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as User);
      }
      setLoading(false);
      return;
    }

    // Get current session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isDemoAdmin]);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      // Demo admin authentication for local / preview testing
      if (password && password.length >= 4) {
        setIsDemoAdmin(true);
        localStorage.setItem('portfolio_demo_admin', 'true');
        setUser({
          id: 'demo-admin-id',
          email: email || 'admin@gdeep.in',
          app_metadata: {},
          user_metadata: { name: 'Admin' },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as User);
        return { error: null };
      } else {
        return { error: new Error('Please provide a password of at least 4 characters.') };
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: new Error(error.message) };
      }

      setSession(data.session);
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Failed to sign in') };
    }
  };

  const signOut = async (): Promise<void> => {
    if (!isSupabaseConfigured) {
      setIsDemoAdmin(false);
      localStorage.removeItem('portfolio_demo_admin');
      setUser(null);
      setSession(null);
      return;
    }

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    } finally {
      setSession(null);
      setUser(null);
      setIsDemoAdmin(false);
      localStorage.removeItem('portfolio_demo_admin');
    }
  };

  const isAuthenticated = Boolean(session?.user || (isDemoAdmin && !isSupabaseConfigured));

  return (
    <AuthContext.Provider
      value={{
        session,
        user: isAuthenticated ? (user || session?.user || null) : null,
        loading,
        isConfigured: isSupabaseConfigured,
        isDemoAdmin,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
