"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  Award,
  Dumbbell,
  Flame,
  LogOut,
  Edit2,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
// Хэрэв Firebase Auth ашиглаж байгаа бол:
// import { auth } from "@/lib/firebase";
// import { signOut } from "firebase/auth";

interface UserProfile {
  displayName: string;
  email: string;
  avatarUrl: string;
  age: number;
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  joinedDate: string;
  stats: {
    totalWorkouts: number;
    totalWeightLifted: string;
    streakDays: number;
  };
}

interface ProfileClientProps {
  initialProfile: UserProfile;
}

export default function ProfileClient({ initialProfile }: ProfileClientProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    age: profile.age,
    experienceLevel: profile.experienceLevel,
  });

  const handleSave = () => {
    setProfile((prev) => ({
      ...prev,
      displayName: formData.displayName,
      age: Number(formData.age),
      experienceLevel: formData.experienceLevel,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      displayName: profile.displayName,
      age: profile.age,
      experienceLevel: profile.experienceLevel,
    });
    setIsEditing(false);
  };

  // Logout хийж /login руу шилжүүлэх функц
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Firebase Auth ашиглаж байгаа бол:
      // await signOut(auth);

      // Login хуудас руу шилжүүлэх
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Үндсэн профайл болон Аватар хэсэг */}
      <div className="bg-zinc-900/80 rounded-2xl p-6 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-zinc-950 font-bold text-2xl shadow-lg ring-4 ring-zinc-800">
            {profile.displayName ? profile.displayName.charAt(0) : "U"}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-zinc-100 flex items-center justify-center sm:justify-start gap-2">
              {profile.displayName}
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </h2>
            <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="w-3.5 h-3.5" />
              {profile.email}
            </p>
            <p className="text-xs text-zinc-500 flex items-center justify-center sm:justify-start gap-1 pt-1">
              <Calendar className="w-3.5 h-3.5" />
              登録日: {profile.joinedDate}
            </p>
          </div>
        </div>

        {/* Засварлах товч */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
            編集 (Засах)
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-xs font-bold rounded-xl transition-all"
            >
              <Check className="w-4 h-4" />
              保存
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl border border-zinc-700 transition-all"
            >
              <X className="w-4 h-4" />
              キャンセル
            </button>
          </div>
        )}
      </div>

      {/* 2. Төрөл бүрийн статистик товч мэдээлэл (Stats Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 font-medium block">連続達成 (Streak)</span>
            <span className="text-lg font-bold text-zinc-100">{profile.stats.streakDays} 日間</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 font-medium block">総ワークアウト数</span>
            <span className="text-lg font-bold text-zinc-100">{profile.stats.totalWorkouts} 回</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 font-medium block">総持ち上げた重量</span>
            <span className="text-lg font-bold text-zinc-100">{profile.stats.totalWeightLifted}</span>
          </div>
        </div>
      </div>

      {/* 3. Хувийн тохиргоо болон засах хэсэг (User Details & Form) */}
      <div className="bg-zinc-900/80 rounded-2xl p-6 border border-zinc-800 space-y-5">
        <h3 className="text-sm font-semibold text-zinc-200 border-b border-zinc-800 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" />
          基本情報 (Үндсэн мэдээлэл)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Нэр */}
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-2">
              表示名 (Хэрэглэгчийн нэр)
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            ) : (
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-2.5 text-sm text-zinc-200">
                {profile.displayName}
              </div>
            )}
          </div>

          {/* Нас */}
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-2">
              年齢 (Нас)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            ) : (
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-2.5 text-sm text-zinc-200">
                {profile.age} 歳
              </div>
            )}
          </div>

          {/* Бэлтгэлийн түвшин */}
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-zinc-400 block mb-2">
              トレーニングレベル (Бэлтгэлийн түвшин)
            </label>
            {isEditing ? (
              <div className="grid grid-cols-3 gap-3">
                {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setFormData({ ...formData, experienceLevel: level })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      formData.experienceLevel === level
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {level === "Beginner" ? "初心者 (Beginner)" : level === "Intermediate" ? "中級者 (Intermediate)" : "上級者 (Advanced)"}
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-2.5 text-sm text-zinc-200 flex items-center justify-between">
                <span>
                  {profile.experienceLevel === "Beginner"
                    ? "初心者 (Beginner)"
                    : profile.experienceLevel === "Intermediate"
                    ? "中級者 (Intermediate)"
                    : "上級者 (Advanced)"}
                </span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  {profile.experienceLevel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Logout Товчлуур */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold rounded-xl border border-rose-500/20 transition-all disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          {isLoggingOut ? "ログアウト中..." : "ログアウト (Системээс гарах)"}
        </button>
      </div>
    </div>
  );
}