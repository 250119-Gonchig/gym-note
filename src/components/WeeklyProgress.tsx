type Props = {
  days: { label: string; sets: number }[];
};

export default function WeeklyProgress({ days }: Props) {
  const max = Math.max(...days.map((d) => d.sets), 1);
  const total = days.reduce((sum, d) => sum + d.sets, 0);

  return (
    <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Weekly Progress</h2>
        <span className="text-green-400 text-sm font-medium bg-green-500/10 px-2.5 py-0.5 rounded-full">
          {total} sets
        </span>
      </div>
      <div className="flex items-end gap-3 h-40 pt-4">
        {days.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div
              className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg min-h-1"
              style={{ height: `${(day.sets / max) * 100}%` }}
              title={`${day.sets} sets`}
            />
            <span className="text-xs text-zinc-500">{day.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
