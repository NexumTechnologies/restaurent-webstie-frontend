export default function CategoryLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="py-4">
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      </div>

      <div className="mt-5 flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-muted"
            />
          ),
        )}
      </div>

      <div className="mt-4 grid min-h-[270px] overflow-hidden rounded-2xl bg-muted lg:grid-cols-2">
        <div className="animate-pulse p-8">
          <div className="h-5 w-32 rounded bg-background/60" />
          <div className="mt-5 h-12 w-60 rounded bg-background/60" />
          <div className="mt-4 h-4 w-full max-w-lg rounded bg-background/60" />
          <div className="mt-2 h-4 w-4/5 max-w-lg rounded bg-background/60" />
        </div>

        <div className="animate-pulse bg-background/30" />
      </div>

      <div className="mt-6 h-16 animate-pulse rounded-2xl bg-muted" />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="h-36 animate-pulse bg-muted sm:h-44" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}