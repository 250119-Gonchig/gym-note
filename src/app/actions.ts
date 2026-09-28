"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isMuscle } from "@/lib/muscles";

// NOTE: 認証を入れたら、各アクションの先頭でユーザーを確認すること

export async function logWorkout(formData: FormData) {
  const exerciseId = Number(formData.get("exerciseId"));
  const exercise = await prisma.exercise.findUnique({ where: { id: exerciseId } });
  if (!exercise) throw new Error("Exercise not found");

  await prisma.workoutLog.create({
    data: { exerciseId, weight: exercise.weight, reps: exercise.reps },
  });
  revalidatePath("/", "layout");
}

export async function deleteLog(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.workoutLog.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function createExercise(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const muscle = formData.get("muscle");
  const weightRaw = String(formData.get("weight") ?? "").trim();
  const reps = Number(formData.get("reps"));

  if (!name || !isMuscle(muscle) || !Number.isInteger(reps) || reps <= 0) {
    throw new Error("Invalid exercise");
  }
  const weight = weightRaw === "" ? null : Number(weightRaw);
  if (weight !== null && (!Number.isFinite(weight) || weight < 0)) {
    throw new Error("Invalid weight");
  }

  await prisma.exercise.create({ data: { name, muscle, weight, reps } });
  revalidatePath("/", "layout");
}
