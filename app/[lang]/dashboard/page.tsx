import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, DollarSign, Clock } from "lucide-react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  const stats = [
    {
      title: dict.dashboard.stats.totalUsers,
      value: "2,847",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: dict.dashboard.stats.activeNow,
      value: "147",
      change: "+3.2%",
      icon: Activity,
    },
    {
      title: dict.dashboard.stats.totalRevenue,
      value: "$48,352",
      change: "+8.1%",
      icon: DollarSign,
    },
    {
      title: dict.dashboard.stats.pendingTasks,
      value: "23",
      change: "-2.4%",
      icon: Clock,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "John Doe",
      action: "Created new project",
      time: "2 min ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated settings",
      time: "5 min ago",
    },
    {
      id: 3,
      user: "Bob Johnson",
      action: "Completed task",
      time: "12 min ago",
    },
    {
      id: 4,
      user: "Alice Brown",
      action: "Added new user",
      time: "25 min ago",
    },
    {
      id: 5,
      user: "Charlie Wilson",
      action: "Generated report",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{dict.dashboard.welcome}, User!</h1>
        <p className="text-muted-foreground">{dict.dashboard.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith("+");
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.recentActivity}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full">
                      <span className="text-primary text-sm font-medium">
                        {item.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-muted-foreground text-xs">
                        {item.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.quickActions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Add User", icon: Users },
                { label: "New Order", icon: DollarSign },
                { label: "View Reports", icon: Activity },
                { label: "Settings", icon: Clock },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="bg-accent hover:bg-accent/80 flex flex-col items-center gap-2 rounded-lg p-4 transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
