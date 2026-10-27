"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Dumbbell } from "lucide-react";
// Firebase ашиглах бол дараах функцүүдийг импортлоно:
// import { auth, googleProvider, facebookProvider } from "@/lib/firebase";
// import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPageClient() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Google-ээр нэвтрэх функц
  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      // await signInWithPopup(auth, googleProvider);
      console.log("Google-ээр нэвтэрч байна...");
    } catch (error) {
      console.error("Google Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Facebook-ээр нэвтрэх функц
  const handleFacebookAuth = async () => {
    setLoading(true);
    try {
      // await signInWithPopup(auth, facebookProvider);
      console.log("Facebook-ээр нэвтэрч байна...");
    } catch (error) {
      console.error("Facebook Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Имэйлээр нэвтрэх / бүртгүүлэх
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        // await createUserWithEmailAndPassword(auth, email, password);
        console.log("Бүртгүүлж байна:", email);
      } else {
        // await signInWithEmailAndPassword(auth, email, password);
        console.log("Нэвтэрч байна:", email);
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
      {/* Аппликейшний Лого & Толгойн хэсэг */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 mb-1">
          <Dumbbell className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-wide">Gym Note</h1>
        <p className="text-xs text-zinc-400">
          {isSignUp ? "新規アカウント作成 (Шинэ бүртгэл)" : "ログイン (login)"}
        </p>
      </div>

      {/* Social Login Товчнууд (Google & Facebook) */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-zinc-950 hover:bg-zinc-800 text-zinc-200 text-xs font-bold py-3 px-4 rounded-xl border border-zinc-800 transition-all hover:border-zinc-700 disabled:opacity-50"
        >
          {/* Google SVG Icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Google で継続 (Continue with Google)
        </button>

        <button
          type="button"
          onClick={handleFacebookAuth}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs font-bold py-3 px-4 rounded-xl border border-[#1877F2]/30 transition-all disabled:opacity-50"
        >
          {/* Facebook SVG Icon */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook で継続 (Continue with Facebook)
        </button>
      </div>

      {/* Зааглагч зураас */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-zinc-800 w-full" />
        <span className="bg-zinc-900 px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest absolute">
          または (or)
        </span>
      </div>

      {/* Имэйл / Нууц үгээр нэвтрэх Форм */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1.5">
            メールアドレス (email address)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@gmail.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-400 block mb-1.5">
            パスワード (password)
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10 mt-2 disabled:opacity-50"
        >
          {isSignUp ? "アカウント作成 (Бүртгүүлэх)" : "ログイン (Login)"}
        </button>
      </form>

      {/* Нэвтрэх / Бүртгүүлэх горим шилжүүлэх */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          {isSignUp ? (
            <span>すでにアカウントをお持ちですか？ ログイン (Login)</span>
          ) : (
            <span>アカウントをお持ちでないですか？ 新規登録 (Sign in)</span>
          )}
        </button>
      </div>
    </div>
  );
}