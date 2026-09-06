export default function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-beige-dark rounded-xl ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-surface rounded-2xl border border-border p-6 space-y-4">
      <SkeletonLoader className="h-4 w-1/3" />
      <SkeletonLoader className="h-8 w-2/3" />
      <SkeletonLoader className="h-20 w-full" />
      <SkeletonLoader className="h-10 w-1/4 rounded-full" />
    </div>
  );
}
