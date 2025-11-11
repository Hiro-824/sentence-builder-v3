"use client"

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const MIN_PASSWORD_LENGTH = 8;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#374151"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {visible ? (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A11.06 11.06 0 0 1 12 4c7 0 11 7 11 7a21.7 21.7 0 0 1-2.9 3.95" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onAuthSuccess: () => void;
  onAnonymousAccess: () => void;
}

const AuthModal = ({ isOpen, onAuthSuccess, onAnonymousAccess }: AuthModalProps) => {
  const [signInIdentifier, setSignInIdentifier] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        onAuthSuccess();
      }
    };
    getUser();

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

  useEffect(() => {
    if (isOpen) {
      setError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const getEmailFromIdentifier = (value: string) =>
    value.includes("@") ? value : `${value}@sentence-builder.app`;

  const resetFeedback = () => {
    setError("");
    setSuccessMessage("");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFeedback();

    const identifier = signInIdentifier.trim();
    if (!identifier) {
      setError("メールアドレスまたはユーザー名を入力してください。");
      return;
    }
    if (!signInPassword) {
      setError("パスワードを入力してください。");
      return;
    }

    setLoading(true);

    try {
      const email = getEmailFromIdentifier(identifier);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: signInPassword,
      });
      if (error) throw error;
      setSignInIdentifier("");
      setSignInPassword("");
      setShowSignInPassword(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFeedback();

    const email = signUpEmail.trim();
    if (!isValidEmail(email)) {
      setError("有効なメールアドレスを入力してください。");
      return;
    }
    if (signUpPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`パスワードは${MIN_PASSWORD_LENGTH}文字以上で入力してください。`);
      return;
    }
    if (signUpPassword !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: signUpPassword,
      });
      if (error) throw error;

      if (!data.session) {
        const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
          email,
          password: signUpPassword,
        });
        if (signInError) throw signInError;
        if (!signInData.session) {
          setSuccessMessage("確認メールを送信しました。メール内のリンクからサインインしてください。");
          setAuthMode("signin");
          setSignUpPassword("");
          setConfirmPassword("");
          setShowSignUpPassword(false);
          setShowConfirmPassword(false);
          return;
        }
      }

      setSuccessMessage("アカウントを作成しました。リダイレクトしています...");
      setSignUpEmail("");
      setSignUpPassword("");
      setConfirmPassword("");
      setShowSignUpPassword(false);
      setShowConfirmPassword(false);
      onAuthSuccess();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (mode: "signin" | "signup") => {
    if (authMode === mode) return;
    resetFeedback();
    setAuthMode(mode);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleAnonymousAccess = () => {
    resetFeedback();
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
            {user ? "ようこそ！" : "サインイン"}
          </h2>
        </div>

        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: '#666666', margin: 0 }}>You are signed in as: {user.email?.split('@')[0] || 'User'}</p>
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              backgroundColor: '#f3f4f6',
              padding: '4px',
              borderRadius: '10px',
              marginBottom: '20px',
              gap: '8px'
            }}>
              {["signin", "signup"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleModeChange(mode as "signin" | "signup")}
                  style={{
                    padding: '10px 0',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: authMode === mode ? '#ffffff' : 'transparent',
                    color: authMode === mode ? '#1a1a1a' : '#6b7280',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: authMode === mode ? 'default' : 'pointer',
                    boxShadow: authMode === mode ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {mode === "signin" ? "サインイン" : "新規登録"}
                </button>
              ))}
            </div>

            {authMode === "signin" ? (
              <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label htmlFor="sign-in-identifier" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    メールアドレスまたはユーザー名
                  </label>
                  <input
                    id="sign-in-identifier"
                    type="text"
                    value={signInIdentifier}
                    onChange={(e) => setSignInIdentifier(e.target.value)}
                    autoComplete="username"
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
                    placeholder="例: user@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="sign-in-password" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    パスワード
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="sign-in-password"
                      type={showSignInPassword ? "text" : "password"}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      autoComplete="current-password"
                      style={{
                        width: '100%',
                        padding: '12px',
                        paddingRight: '44px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      placeholder="パスワードを入力してください"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword((prev) => !prev)}
                      aria-label={showSignInPassword ? "パスワードを隠す" : "パスワードを表示"}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '12px',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <EyeIcon visible={showSignInPassword} />
                    </button>
                  </div>
                </div>
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
                  {loading ? "読み込み中..." : "サインイン"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label htmlFor="sign-up-email" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    メールアドレス
                  </label>
                  <input
                    id="sign-up-email"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    autoComplete="email"
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
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="sign-up-password" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    パスワード
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="sign-up-password"
                      type={showSignUpPassword ? "text" : "password"}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      autoComplete="new-password"
                      style={{
                        width: '100%',
                        padding: '12px',
                        paddingRight: '44px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      placeholder="パスワードを入力してください"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword((prev) => !prev)}
                      aria-label={showSignUpPassword ? "パスワードを隠す" : "パスワードを表示"}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '12px',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <EyeIcon visible={showSignUpPassword} />
                    </button>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px', marginBottom: 0 }}>
                    {MIN_PASSWORD_LENGTH}文字以上で入力してください。
                  </p>
                </div>
                <div>
                  <label htmlFor="sign-up-confirm-password" style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    パスワード（確認）
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="sign-up-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      style={{
                        width: '100%',
                        padding: '12px',
                        paddingRight: '44px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      placeholder="もう一度入力してください"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={showConfirmPassword ? "パスワードを隠す" : "パスワードを表示"}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '12px',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <EyeIcon visible={showConfirmPassword} />
                    </button>
                  </div>
                </div>
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
                  {loading ? "作成中..." : "アカウント作成"}
                </button>
              </form>
            )}

            {error && (
              <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '12px' }}>{error}</div>
            )}
            {successMessage && (
              <div style={{ color: '#16a34a', fontSize: '14px', marginTop: '8px' }}>{successMessage}</div>
            )}

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
                または
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
              サインインせずに使う
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
