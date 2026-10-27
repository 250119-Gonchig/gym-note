"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MUSCLES, type Muscle } from "@/lib/muscles";
import { Check, Plus, Minus, Dumbbell } from "lucide-react";

type Props = {
  selected: Muscle;
  onLogWorkout?: (data: { muscle: Muscle; weight: number; reps: number }) => void;
};

interface LoggedSet {
  id: string;
  muscle: Muscle;
  weight: number;
  reps: number;
  timestamp: string;
}

export default function MusclePicker({ selected: initialSelected, onLogWorkout }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [selected, setSelected] = useState<Muscle>(initialSelected);
  const [hovered, setHovered] = useState<Muscle | null>(null);

  // 1. Zoom / Focus ズームモード ("full", "upper", "lower")
  const [zoomMode, setZoomMode] = useState<"full" | "upper" | "lower">("full");

  // 2. 重量・回数選択モーダルの状態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weight, setWeight] = useState<number>(20); // 標準20kg
  const [reps, setReps] = useState<number>(10);     // 標準10回

  // 3. 記録されたトレーニング履歴
  const [loggedSets, setLoggedSets] = useState<LoggedSet[]>([]);

  const select = (muscle: Muscle) => {
    setSelected(muscle);
    startTransition(() => router.replace(`/?muscle=${muscle}`, { scroll: false }));
    // 部位タップ時に重量/回数選択モーダルを開く
    setIsModalOpen(true);
  };

  const isActive = (muscle: Muscle) => selected === muscle || hovered === muscle;

  const handlers = (muscle: Muscle) => ({
    onClick: () => select(muscle),
    onMouseEnter: () => setHovered(muscle),
    onMouseLeave: () => setHovered(null),
  });

  // トレーニング記録を「確定」して保存
  const handleConfirmLog = () => {
    const newLog: LoggedSet = {
      id: Date.now().toString(),
      muscle: selected,
      weight,
      reps,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLoggedSets((prev) => [newLog, ...prev]);
    if (onLogWorkout) {
      onLogWorkout({ muscle: selected, weight, reps });
    }
    setIsModalOpen(false);
  };

  // ZoomのVIEWBOX設定
  const getViewBox = () => {
    switch (zoomMode) {
      case "upper":
        return "20 10 160 160"; // 上半身ズーム
      case "lower":
        return "20 130 160 170"; // 下半身ズーム
      default:
        return "0 0 200 320"; // 全身
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto relative">
      {/* 1. アナトミー・インタラクティブ・キャンバス */}
      <div className="bg-zinc-900/90 rounded-3xl p-5 shadow-2xl border border-zinc-800 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-red-500" />
              ターゲット部位を選択
            </h2>
            <p className="text-xs text-zinc-400">筋肉を選択して重量と回数を設定します</p>
          </div>
          <span className="text-red-400 text-xs font-semibold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {selected}
          </span>
        </div>

        {/* ズーム切り替えボタン */}
        <div className="flex gap-1.5 mb-3 bg-zinc-950 p-1 rounded-xl border border-zinc-800/80 w-fit mx-auto text-xs">
          <button
            type="button"
            onClick={() => setZoomMode("full")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              zoomMode === "full" ? "bg-red-500 text-white shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            全身 (Full)
          </button>
          <button
            type="button"
            onClick={() => setZoomMode("upper")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              zoomMode === "upper" ? "bg-red-500 text-white shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            上半身 (Upper)
          </button>
          <button
            type="button"
            onClick={() => setZoomMode("lower")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              zoomMode === "lower" ? "bg-red-500 text-white shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            下半身 (Lower)
          </button>
        </div>

        {/* インタラクティブ人体SVG */}
        <div className="h-80 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800 p-2 relative overflow-hidden">
          <svg
            viewBox={getViewBox()}
            className="w-full h-full drop-shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all duration-500 ease-in-out"
          >
            {/* シルエット背景 */}
            <g fill="#27272a">
              <path d="M100,18 C107,18 112,25 112,34 C112,44 106,50 100,50 C94,50 88,44 88,34 C88,25 93,18 100,18 Z" />
              <path d="M96,50 L104,50 L105,58 L95,58 Z" />
            </g>

            {/* 肩 (Shoulders) */}
            <g
              {...handlers("Shoulders")}
              className="cursor-pointer transition-all duration-300 origin-[100px_70px]"
              fill={isActive("Shoulders") ? "#ef4444" : "#3f3f46"}
            >
              <path d="M72,62 C68,65 60,73 58,83 C58,89 63,91 68,87 C72,81 74,71 72,62 Z" />
              <path d="M128,62 C132,65 140,73 142,83 C142,89 137,91 132,87 C128,81 126,71 128,62 Z" />
            </g>

            {/* 胸 (Chest) */}
            <g
              {...handlers("Chest")}
              className="cursor-pointer transition-all duration-300 origin-[100px_78px]"
              fill={isActive("Chest") ? "#ef4444" : "#52525b"}
            >
              <path d="M74,65 C86,63 99,65 99,65 L99,94 C82,94 72,82 74,65 Z" />
              <path d="M126,65 C114,63 101,65 101,65 L101,94 C118,94 128,82 126,65 Z" />
              <line x1="100" y1="65" x2="100" y2="94" stroke="#18181b" strokeWidth="1.5" />
            </g>

            {/* 腹筋 (Core / Abs) */}
            <g
              {...handlers("Core")}
              className="cursor-pointer transition-all duration-300 origin-[100px_110px]"
              fill={isActive("Core") ? "#ef4444" : "#3f3f46"}
            >
              <rect x="88" y="98" width="10" height="9" rx="2" />
              <rect x="102" y="98" width="10" height="9" rx="2" />
              <rect x="88" y="109" width="10" height="9" rx="2" />
              <rect x="102" y="109" width="10" height="9" rx="2" />
              <path d="M87,120 C92,120 100,123 100,123 C100,123 108,120 113,120 C109,134 91,134 87,120 Z" />
            </g>

            {/* 上腕二頭筋 (Biceps) */}
            <g
              {...handlers("Biceps")}
              className="cursor-pointer transition-all duration-300"
              fill={isActive("Biceps") ? "#ef4444" : "#3f3f46"}
            >
              <path d="M58,85 C54,93 51,103 53,111 C55,115 58,113 60,107 C62,99 63,91 58,85 Z" />
              <path d="M142,85 C146,93 149,103 147,111 C145,115 142,113 140,107 C138,99 137,91 142,85 Z" />
            </g>

            {/* 前腕 (Forearms) */}
            <g fill="#27272a">
              <path d="M51,114 C46,126 42,139 44,146 C46,149 50,146 52,138 C55,128 55,118 51,114 Z" />
              <path d="M149,114 C154,126 158,139 156,146 C154,149 150,146 148,138 C145,128 145,118 149,114 Z" />
            </g>

            {/* 脚 (Legs / Quads) */}
            <g
              {...handlers("Legs")}
              className="cursor-pointer transition-all duration-300"
              fill={isActive("Legs") ? "#ef4444" : "#3f3f46"}
            >
              <path d="M74,136 C68,156 66,186 72,213 C77,213 82,196 86,176 C89,156 87,138 74,136 Z" />
              <path d="M126,136 C132,156 134,186 128,213 C123,213 118,196 114,176 C111,156 113,138 126,136 Z" />
            </g>

            {/* ふくらはぎ (Calves) */}
            <g fill="#27272a">
              <path d="M72,217 C69,238 71,268 74,278 L80,278 C82,263 81,238 80,217 Z" />
              <path d="M128,217 C131,238 129,268 126,278 L120,278 C118,263 119,238 120,217 Z" />
            </g>
          </svg>
        </div>
      </div>

      {/* 2. モーダルポップアップ (重量・回数設定) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-xs shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                {selected} ワークアウト
              </span>
              <h3 className="text-lg font-bold text-white pt-2">重量と回数の設定</h3>
            </div>

            {/* 重量設定 */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 space-y-2">
              <span className="text-xs text-zinc-400 font-medium block">重量 (Weight)</span>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setWeight((w) => Math.max(0, w - 2.5))}
                  className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-all active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-black text-white w-20">
                  {weight} <span className="text-xs font-normal text-zinc-500">kg</span>
                </span>
                <button
                  type="button"
                  onClick={() => setWeight((w) => w + 2.5)}
                  className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 回数設定 */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 space-y-2">
              <span className="text-xs text-zinc-400 font-medium block">回数 (Reps)</span>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setReps((r) => Math.max(1, r - 1))}
                  className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-all active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-black text-white w-20">
                  {reps} <span className="text-xs font-normal text-zinc-500">回</span>
                </span>
                <button
                  type="button"
                  onClick={() => setReps((r) => r + 1)}
                  className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition-all"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleConfirmLog}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                OK (保存)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. 本日のトレーニング記録履歴 */}
      {loggedSets.length > 0 && (
        <div className="bg-zinc-900/90 rounded-3xl p-5 border border-zinc-800 space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>本日の記録履歴</span>
            <span className="text-red-400">{loggedSets.length} セット</span>
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {loggedSets.map((log) => (
              <div
                key={log.id}
                className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="font-bold text-white">{log.muscle}</span>
                  <span className="text-zinc-500">({log.timestamp})</span>
                </div>
                <div className="font-semibold text-zinc-200">
                  {log.weight} kg × {log.reps} 回
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 部位選択ボタン一覧 */}
      <div>
        <h2 className="text-base font-bold text-white mb-3">筋肉グループ</h2>
        <div className="grid grid-cols-2 gap-3">
          {MUSCLES.map((m) => (
            <button
              key={m}
              type="button"
              {...handlers(m)}
              className={`transition-all rounded-2xl p-4 border text-left ${
                selected === m
                  ? "bg-red-500 border-red-600 text-white shadow-lg shadow-red-500/20 scale-[1.02]"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <div className="text-base font-semibold">{m}</div>
              <div
                className={`text-xs mt-1 ${
                  selected === m ? "text-red-100" : "text-zinc-500"
                }`}
              >
                {selected === m ? "選択中" : "タップして選択"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}