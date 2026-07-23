"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import AuthModal from "@/components/auth-modal";
import { createClient } from "@/utils/supabase/client";

interface AppAuthContextValue {
  hasAccess: boolean;
  user: User | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  signOut: () => Promise<void>;
}

const AppAuthContext = createContext<AppAuthContextValue | null>(null);

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [hasAccess, setHasAccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const grantAuthenticatedAccess = useCallback(() => {
    setHasAccess(true);
    setIsAuthModalOpen(false);
  }, []);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        setHasAccess(true);
      } else {
        setIsAuthModalOpen(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setHasAccess(true);
        setIsAuthModalOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const value = useMemo<AppAuthContextValue>(() => ({
    hasAccess,
    user,
    isAuthModalOpen,
    openAuthModal: () => setIsAuthModalOpen(true),
    signOut: async () => {
      await supabase.auth.signOut();
      setUser(null);
      setHasAccess(false);
      setIsAuthModalOpen(true);
    },
  }), [hasAccess, isAuthModalOpen, supabase, user]);

  return (
    <AppAuthContext.Provider value={value}>
      {hasAccess ? children : null}
      <AuthModal
        isOpen={isAuthModalOpen}
        onAuthSuccess={grantAuthenticatedAccess}
        onAnonymousAccess={() => {
          setHasAccess(true);
          setIsAuthModalOpen(false);
        }}
      />
    </AppAuthContext.Provider>
  );
}

export function useAppAuth() {
  const context = useContext(AppAuthContext);
  if (!context) throw new Error("useAppAuth must be used inside AppAuthProvider");
  return context;
}
