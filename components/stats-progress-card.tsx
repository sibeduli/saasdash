import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsProgressCardProps {
  title: string;
  value: number;
  total: number;
  label?: string;
  className?: string;
}

export function StatsProgressCard({
  title,
  value,
  total,
  label,
  className,
}: StatsProgressCardProps) {
  const percentage = Math.round((value / total) * 100);
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="relative h-20 w-20 shrink-0">
          <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              strokeWidth="8"
              className="stroke-muted"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="stroke-amber-500"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{percentage}%</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="mt-1 text-2xl font-bold">
            {value.toLocaleString()}
            <span className="text-muted-foreground text-sm font-normal">
              {" "}
              / {total.toLocaleString()}
            </span>
          </p>
          {label && (
            <p className="text-muted-foreground mt-0.5 text-xs">{label}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
