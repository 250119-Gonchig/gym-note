import PageHeader from "@/components/PageHeader";
import ProfileClient from "./ProfileClient";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  // DB эсвэл Auth-аас ирэх хэрэглэгчийн өгөгдөл
  const mockUserProfile = {
    displayName: "山田 太郎 (Taro Yamada)",
    email: "yamada.taro@example.com",
    avatarUrl: "", // Хоосон байвал автоматаар инитсиал харуулна
    age: 26,
    experienceLevel: "Intermediate" as "Beginner" | "Intermediate" | "Advanced",
    joinedDate: "2024年 1月",
    stats: {
      totalWorkouts: 48,
      totalWeightLifted: "12,450 kg",
      streakDays: 5,
    },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <PageHeader title="プロフィール" subtitle="ユーザー情報とトレーニング設定" />
      <ProfileClient initialProfile={mockUserProfile} />
    </div>
  );
}