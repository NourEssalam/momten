const bar = 'animate-pulse rounded-xl bg-section'

export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="container pb-0">
        <div className={`${bar} h-5 w-32`} />
        <div className={`${bar} mt-8 h-7 w-24 rounded-full`} />
        <div className={`${bar} mt-4 h-10 w-full max-w-4xl`} />
        <div className={`${bar} mt-3 h-10 w-2/3 max-w-2xl`} />
        <div className={`${bar} mt-5 h-5 w-full max-w-3xl`} />
        <div className={`${bar} mt-2 h-5 w-3/4 max-w-2xl`} />
        <div className="mt-6 flex gap-6">
          <div className={`${bar} h-8 w-36`} />
          <div className={`${bar} h-8 w-44`} />
        </div>
        <div className="mt-10 aspect-[16/9] animate-pulse rounded-3xl bg-section" />
      </div>
      <div className="container pt-10">
        <div className="mx-auto max-w-3xl space-y-3">
          {[100, 95, 100, 85, 100, 70, 100, 90].map((w, i) => (
            <div key={i} className={`${bar} h-4`} style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
