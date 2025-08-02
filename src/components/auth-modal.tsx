"use client"

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthModalProps {
  isOpen: boolean;
  onAuthSuccess: () => void;
  onAnonymousAccess: () => void;
}

const AuthModal = ({ isOpen, onAuthSuccess, onAnonymousAccess }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  useEffect(() => {
    // Check if user is already authenticated
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        onAuthSuccess();
      }
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          onAuthSuccess();
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth, onAuthSuccess]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleAnonymousAccess = () => {
    onAnonymousAccess();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '400px',
        width: '100%',
        margin: '0 16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            {user ? "Welcome!" : "Sign In"}
          </h2>
        </div>

        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: '#666666', margin: 0 }}>You are signed in as: {user.email}</p>
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="email" style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '4px'
                }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '4px'
                }}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="Enter your password"
                />
              </div>
              {error && (
                <div style={{ color: '#dc2626', fontSize: '14px' }}>{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: '#007AFF',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease',
                  opacity: loading ? 0.5 : 1
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#0056b3')}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#007AFF')}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '24px 0'
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                backgroundColor: '#e5e7eb'
              }}></div>
              <span style={{
                padding: '0 16px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                or
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                backgroundColor: '#e5e7eb'
              }}></div>
            </div>
            
            <button
              onClick={handleAnonymousAccess}
              style={{
                width: '100%',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              Continue without signing in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal; 