import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  dotSize?: number;
  dotSpacing?: number;
}

export function DotPattern({
  className,
  dotSize = 1,
  dotSpacing = 20,
}: DotPatternProps) {
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        backgroundImage: `radial-gradient(circle, currentColor ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
      }}
    />
  );
}
