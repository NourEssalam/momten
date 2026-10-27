import Container from '@/components/shared-components/Container'

export default function Loading() {
  return (
    <div role="status" aria-busy="true" className="animate-pulse">
      <Container className="pb-8">
        <div className="mb-3 h-4 w-28 rounded-full bg-section" />
        <div className="h-12 w-full max-w-md rounded-2xl bg-section" />
        <div className="mt-5 h-4 w-full max-w-2xl rounded-full bg-section" />
        <div className="mt-2 h-4 w-2/3 max-w-xl rounded-full bg-section" />
      </Container>
      <Container className="pt-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-24 rounded-2xl border border-tint bg-white"
              />
            ))}
          </div>
          <div className="h-[28rem] rounded-3xl border border-tint bg-white lg:col-span-3" />
        </div>
      </Container>
    </div>
  )
}
