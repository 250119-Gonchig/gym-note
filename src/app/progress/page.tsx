import PageHeader from "@/components/PageHeader";
import ProgressClient from "./ProgressClient";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  // 必要に応じてサーバーからトレーニングデータ/履歴をフェッチします
  const mockData = {
    trainingStatus: "最適化済み",
    baseFitness: 68.4,
    loadImpact: 42.1,
    recoveryPercent: 85,
    accuracyScore: 88,
    weeklyLoad: [
      { day: "月", load: 120 },
      { day: "火", load: 200 },
      { day: "水", load: 80 },
      { day: "木", load: 250 },
      { day: "金", load: 190 },
      { day: "土", load: 310 },
      { day: "日", load: 140 },
    ],
    workedMuscles: [
      { name: "胸 (Chest)", status: "高負荷", color: "text-red-500" },
      { name: "肩 (Deltoids)", status: "中負荷", color: "text-amber-500" },
      { name: "太もも (Quads)", status: "回復中", color: "text-emerald-500" },
    ],
  };

  return (
    <>
      <PageHeader title="Progress" subtitle="How your training adds up" />
      <ProgressClient initialData={mockData} />
    </>
  );
}
