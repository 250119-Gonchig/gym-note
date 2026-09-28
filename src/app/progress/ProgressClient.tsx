"use client";

import { useState } from "react";
import {
  Activity,
  Flame,
  Heart,
  Dumbbell,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ProgressProps {
  initialData: {
    trainingStatus: string;
    baseFitness: number;
    loadImpact: number;
    recoveryPercent: number;
    accuracyScore: number;
    weeklyLoad: Array<{ day: string; load: number }>;
    workedMuscles: Array<{ name: string; status: string; color: string }>;
  };
}

export default function ProgressClient({ initialData }: ProgressProps) {
  const [range, setRange] = useState<"7d" | "1m" | "6m">("7d");

  return (
    <div className="space-y-6">
      {/* 期間選択フィルター */}
      <div className="flex justify-between items-center bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800">
        <span className="text-xs text-zinc-400 font-medium px-3">
          表示期間:
        </span>
        <div className="flex space-x-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          {(["7d", "1m", "6m"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                range === item
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item === "7d" ? "7日間" : item === "1m" ? "1ヶ月" : "6ヶ月"}
            </button>
          ))}
        </div>
      </div>

      {/* メイングリッドブロック */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1: トレーニングステータス */}
        <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-semibold text-zinc-200">
                トレーニングステータス
              </h3>
            </div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">
                {initialData.trainingStatus}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              最近のトレーニング負荷は最適なレベルです。継続的な成長が期待できます。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-zinc-800/80">
            <div>
              <span className="text-[11px] text-zinc-500 block">ベースフィットネス</span>
              <span className="text-base font-bold text-zinc-100">
                {initialData.baseFitness}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-500 block">負荷インパクト</span>
              <span className="text-base font-bold text-zinc-100">
                {initialData.loadImpact}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: リアルタイムリカバリー */}
        <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-semibold text-zinc-200">
                リカバリー状態
              </h3>
            </div>
            <div className="flex items-baseline space-x-2 my-2">
              <span className="text-4xl font-extrabold text-white">
                {initialData.recoveryPercent}%
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                回復済み
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden my-3">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${initialData.recoveryPercent}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-zinc-400">
            次の高強度トレーニングまで約12時間必要です。
          </p>
        </div>

        {/* Card 3: 達成精度スコア */}
        <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-semibold text-zinc-200">
                達成精度スコア
              </h3>
            </div>
            <div className="flex items-baseline space-x-2 my-2">
              <span className="text-4xl font-extrabold text-emerald-400">
                {initialData.accuracyScore}%
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                計画達成率
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed mt-2">
            目標のセット数、重量、レップ数を88%の精度で達成しました。
          </p>
        </div>

        {/* Card 4: トレーニング負荷エリアチャート */}
        <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800 md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-semibold text-zinc-200">
                トレーニング負荷
              </h3>
            </div>
          </div>
          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={initialData.weeklyLoad}>
                <defs>
                  <linearGradient id="colorLoadNext" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="load"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLoadNext)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 5: 部位別負荷 */}
        <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800">
          <div className="flex items-center space-x-2 mb-4">
            <Dumbbell className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-semibold text-zinc-200">
              部位別負荷
            </h3>
          </div>
          <div className="divide-y divide-zinc-800/80">
            {initialData.workedMuscles.map((m, idx) => (
              <div
                key={idx}
                className="py-2.5 flex justify-between items-center text-xs"
              >
                <span className="text-zinc-300 font-medium">{m.name}</span>
                <span className={`font-bold ${m.color}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}