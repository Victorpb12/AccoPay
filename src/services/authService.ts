import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

type AuthResult = { ok: true; user: any } | { ok: false; error: string };

export const authService = {
  signIn: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true, user: data.user };
    } catch (err: any) {
      return { ok: false, error: err?.message || "Erro desconhecido" };
    }
  },

  signUp: async (
    email: string,
    password: string,
    metadata?: { name?: string }
  ): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true, user: data.user };
    } catch (err: any) {
      return { ok: false, error: err?.message || "Erro desconhecido" };
    }
  },

  signOut: async (): Promise<{ ok: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || "Erro desconhecido" };
    }
  },

  resetPassword: async (
    email: string
  ): Promise<{ ok: true } | { ok: false; error: string }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "myapp://reset-password",
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || "Erro desconhecido" };
    }
  },

  getCurrentUser: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (err) {
      return null;
    }
  },

  getSession: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session;
    } catch (err) {
      return null;
    }
  },
};
