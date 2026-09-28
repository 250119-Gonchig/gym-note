import { prisma } from "@/lib/prisma";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** 今日を含む直近7日間の、日ごとのセット数 */
export async function getWeeklySets() {
  const today = startOfDay(new Date());
  const from = new Date(today);
  from.setDate(from.getDate() - 6);

  const logs = await prisma.workoutLog.findMany({
    where: { performedAt: { gte: from } },
    select: { performedAt: true },
  });

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(from);
    day.setDate(from.getDate() + i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const sets = logs.filter((l) => l.performedAt >= day && l.performedAt < next).length;
    return { label: DAY_LABELS[day.getDay()], sets };
  });
}

export function startOfToday() {
  return startOfDay(new Date());
}
