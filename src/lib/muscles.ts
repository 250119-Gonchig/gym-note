export const MUSCLES = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Legs", "Core"] as const;

export type Muscle = (typeof MUSCLES)[number];

export function isMuscle(value: unknown): value is Muscle {
  return typeof value === "string" && (MUSCLES as readonly string[]).includes(value);
}

export function formatWeight(weight: number | null) {
  return weight == null ? "Bodyweight" : `${weight}kg`;
}
