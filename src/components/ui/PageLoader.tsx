// Skeleton components with shimmer effect
interface SkeletonProps {
  className?: string;
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded bg-muted ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-card border border-border p-6 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      <div className="space-y-4">
        <SkeletonText className="h-4 w-3/4" />
        <SkeletonText className="h-4 w-1/2" />
        <div className="flex gap-2">
          <SkeletonText className="h-6 w-16 rounded-full" />
          <SkeletonText className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAvatar({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-full bg-muted ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
}

// Simple page loader - no animations
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}
