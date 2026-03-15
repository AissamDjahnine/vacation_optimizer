export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-4xl border border-line bg-white p-7 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-mist" />
        <div className="h-10 w-32 rounded-full bg-mist" />
        <div className="h-10 w-24 rounded-full bg-mist" />
      </div>
      <div className="mt-6 space-y-4">
        <div className="h-8 w-3/4 rounded-2xl bg-mist" />
        <div className="h-5 w-1/2 rounded-xl bg-mist" />
        <div className="h-4 w-2/3 rounded-xl bg-mist" />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-24 rounded-3xl bg-peach" />
          <div className="h-24 rounded-3xl bg-lavender" />
        </div>
        <div className="grid grid-cols-4 gap-3 rounded-4xl border border-line bg-paper p-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 rounded-3xl bg-mist" />
          ))}
        </div>
      </div>
    </div>
  );
}
