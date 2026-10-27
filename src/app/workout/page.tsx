"use client";

import { useState } from "react";
import { Play, ChevronRight, X, Clock, Flame, Dumbbell } from "lucide-react";

// 1. Дасгалын Дата Бүтэц (YouTube Линк оруулах хэсэгтэй)
interface Exercise {
  id: string;
  title: string;
  duration: string;
  youtubeId: string; // YouTube Бичлэгийн ID (Жишээ нь: dQw4w9WgXcQ)
  youtubeUrl?: string; // Нийт YouTube Линк
  thumbnailUrl: string;
  workoutsCount: number;
}

const workoutList: Exercise[] = [
  {
    id: "1",
    title: "Pilates with Essential Kit",
    duration: "20 min",
    youtubeId: "", // TODO: YouTube Video ID оруулах хэсэг (Жишээ: "dQw4w9WgXcQ")
    youtubeUrl: "", // TODO: YouTube URL оруулах хэсэг (Жишээ: "https://www.youtube.com/watch?v=...")
    thumbnailUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300",
    workoutsCount: 28,
  },
  {
    id: "2",
    title: "Home Pilates & Core",
    duration: "15 min",
    youtubeId: "", // TODO: YouTube Video ID оруулах хэсэг
    youtubeUrl: "", // TODO: YouTube URL оруулах хэсэг
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300",
    workoutsCount: 15,
  },
  {
    id: "3",
    title: "Calisthenics Workout",
    duration: "30 min",
    youtubeId: "", // TODO: YouTube Video ID оруулах хэсэг
    youtubeUrl: "", // TODO: YouTube URL оруулах хэсэг
    thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300",
    workoutsCount: 28,
  },
  {
    id: "4",
    title: "Wall Pilates Routine",
    duration: "25 min",
    youtubeId: "", // TODO: YouTube Video ID оруулах хэсэг
    youtubeUrl: "", // TODO: YouTube URL оруулах хэсэг
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
    workoutsCount: 20,
  },
];

export default function WorkoutsPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // YouTube URL-ээс Video ID ялгаж авах туслах функц
  const getYouTubeEmbedUrl = (exercise: Exercise) => {
    let videoId = exercise.youtubeId;

    if (!videoId && exercise.youtubeUrl) {
      const match = exercise.youtubeUrl.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
      );
      if (match && match[1]) {
        videoId = match[1];
      }
    }

    // Линк байхгүй үед жишээ Placeholder видео харуулна
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`
      : null;
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-zinc-950 text-zinc-100 p-4 pb-20">
      {/* 2. Workouts Жинхэнэ Жагсаалтын хэсэг */}
      {!selectedExercise ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center pt-2">
            <h1 className="text-2xl font-black tracking-tight text-white">Workouts</h1>
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl">
              <Dumbbell className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-3">
            {workoutList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedExercise(item)}
                className="flex items-center justify-between p-3 bg-zinc-900/80 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white/80 fill-white/80" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.workoutsCount} workouts • {item.duration}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3. YouTube Дасгал Сурах / Үзэх Дэлгэц (Video Player View) */
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Буцах / Хаах Товч */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Guided Video Workout
            </span>
            <button
              onClick={() => setSelectedExercise(null)}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* YouTube Embedded Player */}
          <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            {getYouTubeEmbedUrl(selectedExercise) ? (
              <iframe
                src={getYouTubeEmbedUrl(selectedExercise)!}
                title={selectedExercise.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Линк хоосон байх үед харагдах Placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-zinc-900/90">
                <Play className="w-12 h-12 text-zinc-600" />
                <div>
                  <p className="text-xs text-amber-400 font-medium">
                    YouTubeへのリンクはありません。
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    `workoutList` массив дахь `youtubeId` эсвэл `youtubeUrl` дээр линк оруулна уу.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Дэлгэрэнгүй Мэдээлэл болон Таймерын хэсэг */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">{selectedExercise.title}</h2>
              <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  {selectedExercise.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  150 Cal
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex gap-2">
              <button
                onClick={() => setSelectedExercise(null)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}