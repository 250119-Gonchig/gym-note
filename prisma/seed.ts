import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const exercises = [
  { name: "Bench Press", muscle: "Chest", weight: 80, reps: 10 },
  { name: "Incline Dumbbell Press", muscle: "Chest", weight: 24, reps: 12 },
  { name: "Push Ups", muscle: "Chest", weight: null, reps: 20 },
  { name: "Deadlift", muscle: "Back", weight: 120, reps: 5 },
  { name: "Lat Pulldown", muscle: "Back", weight: 55, reps: 12 },
  { name: "Pull Ups", muscle: "Back", weight: null, reps: 8 },
  { name: "Overhead Press", muscle: "Shoulders", weight: 45, reps: 8 },
  { name: "Lateral Raise", muscle: "Shoulders", weight: 10, reps: 15 },
  { name: "Barbell Curl", muscle: "Biceps", weight: 30, reps: 10 },
  { name: "Hammer Curl", muscle: "Biceps", weight: 14, reps: 12 },
  { name: "Triceps Pushdown", muscle: "Triceps", weight: 25, reps: 12 },
  { name: "Dips", muscle: "Triceps", weight: null, reps: 12 },
  { name: "Squat", muscle: "Legs", weight: 100, reps: 8 },
  { name: "Leg Press", muscle: "Legs", weight: 160, reps: 12 },
  { name: "Plank", muscle: "Core", weight: null, reps: 60 },
  { name: "Hanging Leg Raise", muscle: "Core", weight: null, reps: 12 },
];

async function main() {
  for (const e of exercises) {
    await prisma.exercise.upsert({ where: { name: e.name }, update: {}, create: e });
  }
  console.log(`Seeded ${exercises.length} exercises`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
