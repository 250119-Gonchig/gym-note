type Props = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-red-500/20">
        G
      </div>
    </div>
  );
}
