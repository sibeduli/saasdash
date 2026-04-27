"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface StatsChartCardProps {
  title: string;
  value: string | number;
  change: string;
  changeLabel?: string;
  data: { value: number }[];
  variant?: "badge" | "text" | "compact";
  icon?: React.ReactNode;
  className?: string;
}

export function StatsChartCard({
  title,
  value,
  change,
  changeLabel = "vs yesterday",
  data,
  variant = "badge",
  icon,
  className,
}: StatsChartCardProps) {
  const isPositive = change.startsWith("+");
  const isNegative = change.startsWith("-");
  const color = isPositive ? "#22c55e" : isNegative ? "#ef4444" : "#9ca3af";

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="relative z-10 pt-6">
        {variant === "compact" ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium">
                {title}
              </p>
              {icon && (
                <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  {icon}
                </div>
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold">{value}</p>
              <span
                className={cn(
                  "flex items-center gap-0.5 text-sm font-medium",
                  isPositive && "text-green-600 dark:text-green-400",
                  isNegative && "text-red-600 dark:text-red-400",
                  !isPositive && !isNegative && "text-muted-foreground"
                )}
              >
                {isPositive && <TrendingUp className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                {change}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <p className="text-muted-foreground text-sm font-medium">
                {title}
              </p>
              {variant === "text" && (
                <p
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    isPositive && "text-green-600 dark:text-green-400",
                    isNegative && "text-red-600 dark:text-red-400",
                    !isPositive && !isNegative && "text-muted-foreground"
                  )}
                >
                  {isPositive && <TrendingUp className="h-4 w-4" />}
                  {isNegative && <TrendingDown className="h-4 w-4" />}
                  {!isPositive && !isNegative && <Minus className="h-4 w-4" />}
                  {change}
                </p>
              )}
            </div>
            <p className="mt-1 text-3xl font-bold">{value}</p>
            {variant === "badge" && (
              <Badge
                variant="secondary"
                className={cn(
                  "mt-2 gap-1 border-0 font-medium",
                  isPositive &&
                    "bg-green-200 text-green-800 dark:bg-green-500/20 dark:text-green-400",
                  isNegative &&
                    "bg-red-200 text-red-800 dark:bg-red-500/20 dark:text-red-400",
                  !isPositive &&
                    !isNegative &&
                    "dark:bg-muted dark:text-muted-foreground bg-gray-200 text-gray-700"
                )}
              >
                {isPositive && <TrendingUp className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
                {change} {changeLabel}
              </Badge>
            )}
          </>
        )}
      </CardContent>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 opacity-40">
        <ResponsiveContainer width="100%" height={48} minWidth={100}>
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`gradient-${title.replace(/\s/g, "")}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${title.replace(/\s/g, "")})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
