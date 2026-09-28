import { createExercise, logWorkout } from "@/app/actions";
import MusclePicker from "@/components/MusclePicker";
import PageHeader from "@/components/PageHeader";
import WeeklyProgress from "@/components/WeeklyProgress";
import { formatWeight, isMuscle } from "@/lib/muscles";
import { prisma } from "@/lib/prisma";
import { getWeeklySets } from "@/lib/progress";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { muscle: muscleParam } = await searchParams;
  const muscle = isMuscle(muscleParam) ? muscleParam : "Chest";

  const [exercises, weekly] = await Promise.all([
    prisma.exercise.findMany({ where: { muscle }, orderBy: { createdAt: "asc" } }),
    getWeeklySets(),
  ]);

  return (
    <>
      <PageHeader title="Gym Note" subtitle="Track your workouts smarter" />

      <MusclePicker selected={muscle} />

      {/* Exercises List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">{muscle} Exercises</h2>
          <span className="text-zinc-400 text-sm">{exercises.length} exercises</span>
        </div>

        <div className="space-y-3">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{exercise.name}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{exercise.muscle}</p>
                </div>
                <form action={logWorkout}>
                  <input type="hidden" name="exerciseId" value={exercise.id} />
                  <button className="bg-red-500 hover:bg-red-400 transition px-4 py-2 rounded-xl text-sm font-medium">
                    Add
                  </button>
                </form>
              </div>
              <div className="flex gap-3 mt-4 text-sm">
                <div className="bg-zinc-800 px-3 py-2 rounded-xl text-zinc-300">🏋️ {formatWeight(exercise.weight)}</div>
                <div className="bg-zinc-800 px-3 py-2 rounded-xl text-zinc-300">🔄 {exercise.reps} reps</div>
              </div>
            </div>
          ))}

          {/* New exercise */}
          <details className="bg-zinc-900 rounded-2xl border border-dashed border-zinc-700">
            <summary className="cursor-pointer p-4 text-zinc-400 text-sm">+ New {muscle} exercise</summary>
            <form action={createExercise} className="px-4 pb-4 space-y-3">
              <input type="hidden" name="muscle" value={muscle} />
              <input
                name="name"
                required
                placeholder="Exercise name"
                className="w-full bg-zinc-800 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="flex gap-3">
                <input
                  name="weight"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="kg (empty = bodyweight)"
                  className="flex-1 min-w-0 bg-zinc-800 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  name="reps"
                  type="number"
                  min="1"
                  required
                  placeholder="reps"
                  className="w-24 bg-zinc-800 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button className="w-full bg-red-500 hover:bg-red-400 transition px-4 py-2 rounded-xl text-sm font-medium">
                Save
              </button>
            </form>
          </details>
        </div>
      </div>

      <WeeklyProgress days={weekly} />
    </>
  );
}
