"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MUSCLES, type Muscle } from "@/lib/muscles";

type Props = {
  selected: Muscle;
};

export default function MusclePicker({ selected: initialSelected }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [selected, setSelected] = useState<Muscle>(initialSelected);
  const [hovered, setHovered] = useState<Muscle | null>(null);

  const select = (muscle: Muscle) => {
    setSelected(muscle);
    startTransition(() => router.replace(`/?muscle=${muscle}`, { scroll: false }));
  };

  const isActive = (muscle: Muscle) => selected === muscle || hovered === muscle;

  // SVG の各部位に付けるイベント
  const handlers = (muscle: Muscle) => ({
    onClick: () => select(muscle),
    onMouseEnter: () => setHovered(muscle),
    onMouseLeave: () => setHovered(null),
  });

  return (
    <>
      {/* Anatomy Detail Card */}
      <div className="bg-zinc-900 rounded-3xl p-5 shadow-lg border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today Workout</h2>
          <span className="text-red-400 text-sm font-medium bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {selected} Day
          </span>
        </div>

        <div className="h-80 rounded-2xl bg-zinc-950 flex flex-col items-center justify-center border border-zinc-800 p-4 relative overflow-hidden">
          <div className="text-zinc-500 mb-2 text-xs uppercase tracking-wider font-semibold">
            Interactive Anatomy (Hover/Tap)
          </div>

          <svg viewBox="0 0 200 320" className="w-full h-56 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* Head & neck */}
            <g>
              <path d="M100,20 C108,20 112,28 112,36 C112,46 106,52 100,52 C94,52 88,46 88,36 C88,28 92,20 100,20 Z" fill="#3f3f46" />
              <path d="M96,52 L104,52 L105,60 L95,60 Z" fill="#27272a" />
            </g>

            {/* Shoulders */}
            <g
              {...handlers("Shoulders")}
              className="cursor-pointer transition-all duration-300 origin-[100px_80px]"
              style={{ transform: isActive("Shoulders") ? "scale(1.15)" : "scale(1)" }}
              fill={isActive("Shoulders") ? "#ef4444" : "#3f3f46"}
            >
              <path d="M74,66 C70,68 62,75 62,85 C62,92 68,96 72,94 C76,88 78,76 74,66 Z" />
              <path d="M126,66 C130,68 138,75 138,85 C138,92 132,96 128,94 C124,88 122,76 126,66 Z" />
            </g>

            {/* Chest */}
            <g
              {...handlers("Chest")}
              className="cursor-pointer transition-all duration-300 origin-[100px_80px]"
              style={{ transform: isActive("Chest") ? "scale(1.2)" : "scale(1)" }}
            >
              <path
                d="M76,68 C88,65 100,66 100,66 C100,66 112,65 124,68 C126,82 120,95 101,95 L100,95 C80,95 74,82 76,68 Z"
                fill={isActive("Chest") ? "#ef4444" : "#52525b"}
                filter={isActive("Chest") ? "drop-shadow(0 0 8px #ef4444)" : undefined}
              />
              <line x1="100" y1="66" x2="100" y2="94" stroke="#27272a" strokeWidth="1.5" />
            </g>

            {/* Core */}
            <g
              {...handlers("Core")}
              className="cursor-pointer transition-all duration-300 origin-[100px_115px]"
              style={{ transform: isActive("Core") ? "scale(1.2)" : "scale(1)" }}
              fill={isActive("Core") ? "#ef4444" : "#3f3f46"}
            >
              <rect x="88" y="100" width="10" height="8" rx="2" />
              <rect x="102" y="100" width="10" height="8" rx="2" />
              <rect x="88" y="111" width="10" height="8" rx="2" />
              <rect x="102" y="111" width="10" height="8" rx="2" />
              <path d="M86,122 C92,122 100,125 100,125 C100,125 108,122 114,122 C110,135 90,135 86,122 Z" />
            </g>

            {/* Biceps */}
            <g
              {...handlers("Biceps")}
              className="cursor-pointer transition-all duration-300"
              fill={isActive("Biceps") ? "#ef4444" : "#3f3f46"}
            >
              <path
                d="M60,88 C54,96 50,108 52,118 C54,122 58,122 60,116 C62,108 64,96 60,88 Z"
                className="transition-transform duration-300 origin-[56px_100px]"
                style={{ transform: isActive("Biceps") ? "scale(1.25)" : "scale(1)" }}
              />
              <path
                d="M140,88 C146,96 150,108 148,118 C146,122 142,122 140,116 C138,108 136,96 140,88 Z"
                className="transition-transform duration-300 origin-[144px_100px]"
                style={{ transform: isActive("Biceps") ? "scale(1.25)" : "scale(1)" }}
              />
              {/* Forearms */}
              <path d="M51,120 C46,132 42,145 44,152 C46,155 50,152 52,144 C55,134 55,124 51,120 Z" fill="#27272a" />
              <path d="M149,120 C154,132 158,145 156,152 C154,155 150,152 148,144 C145,134 145,124 149,120 Z" fill="#27272a" />
            </g>

            {/* Legs */}
            <g {...handlers("Legs")} className="cursor-pointer transition-all duration-300">
              <g
                className="transition-transform duration-300 origin-[100px_160px]"
                style={{ transform: isActive("Legs") ? "scale(1.15)" : "scale(1)" }}
                fill={isActive("Legs") ? "#ef4444" : "#3f3f46"}
              >
                <path d="M76,140 C70,160 68,190 74,220 C79,220 84,200 88,180 C92,160 90,142 76,140 Z" />
                <path d="M124,140 C130,160 132,190 126,220 C121,220 116,200 112,180 C108,160 110,142 124,140 Z" />
              </g>
              <g fill={isActive("Legs") ? "#ef4444" : "#27272a"}>
                <path d="M73,224 C70,245 72,275 75,285 L81,285 C83,270 82,245 81,224 Z" />
                <path d="M127,224 C130,245 128,275 125,285 L119,285 C117,270 118,245 119,224 Z" />
              </g>
            </g>
          </svg>

          <p className="mt-2 text-zinc-400 text-sm">
            Selected: <span className="text-red-400 font-semibold">{selected}</span>
          </p>
        </div>
      </div>

      {/* Muscle Groups Grid Buttons */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Muscle Groups</h2>
        <div className="grid grid-cols-2 gap-3">
          {MUSCLES.map((muscle) => (
            <button
              key={muscle}
              type="button"
              {...handlers(muscle)}
              className={`transition-all rounded-2xl p-4 border text-left ${
                selected === muscle
                  ? "bg-red-500 border-red-600 text-white shadow-lg shadow-red-500/20 scale-[1.02]"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="text-lg font-medium">{muscle}</div>
              <div className={`text-sm mt-1 ${selected === muscle ? "text-red-100" : "text-zinc-500"}`}>
                {selected === muscle ? "Active" : "Tap to select"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
