import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RecentItem {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  timestamp?: string;
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
}

interface RecentItemsCardProps {
  title: string;
  subtitle: string;
  viewAllHref: string;
  viewAllLabel: string;
  items: RecentItem[];
  emptyMessage?: string;
  className?: string;
}

export function RecentItemsCard({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  items,
  emptyMessage = "No items yet",
  className,
}: RecentItemsCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium transition-colors"
        >
          {viewAllLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        {items.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {item.badge && (
                    <Badge variant={item.badge.variant || "default"}>
                      {item.badge.label}
                    </Badge>
                  )}
                  {item.timestamp && (
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {item.timestamp}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
