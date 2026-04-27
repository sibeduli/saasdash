import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentItemsCard } from "@/components/recent-items-card";
import { StatsChartCard } from "@/components/stats-chart-card";
import { StatsProgressCard } from "@/components/stats-progress-card";
import {
  Users,
  Activity,
  DollarSign,
  ShoppingCart,
  User,
  Clock,
} from "lucide-react";

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

  const recentOrders = [
    {
      id: "ORD-001",
      icon: <ShoppingCart className="h-5 w-5" />,
      title: "Order #12847",
      subtitle: "John Doe • 3 items",
      timestamp: "2 Mar",
      badge: { label: "Paid", variant: "default" as const },
    },
    {
      id: "ORD-002",
      icon: <ShoppingCart className="h-5 w-5" />,
      title: "Order #12846",
      subtitle: "Jane Smith • 1 item",
      timestamp: "1 Mar",
      badge: { label: "Pending", variant: "secondary" as const },
    },
    {
      id: "ORD-003",
      icon: <ShoppingCart className="h-5 w-5" />,
      title: "Order #12845",
      subtitle: "Bob Johnson • 5 items",
      timestamp: "28 Feb",
      badge: { label: "Shipped", variant: "outline" as const },
    },
  ];

  const recentUsers = [
    {
      id: "USR-001",
      icon: <User className="h-5 w-5" />,
      title: "Sarah Connor",
      subtitle: "sarah@example.com",
      timestamp: "Today",
    },
    {
      id: "USR-002",
      icon: <User className="h-5 w-5" />,
      title: "Mike Ross",
      subtitle: "mike@example.com",
      timestamp: "Yesterday",
    },
    {
      id: "USR-003",
      icon: <User className="h-5 w-5" />,
      title: "Emma Watson",
      subtitle: "emma@example.com",
      timestamp: "3 days ago",
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
        <StatsChartCard
          title={dict.dashboard.stats.totalUsers}
          value="2,847"
          change="+12.5%"
          changeLabel="vs yesterday"
          data={[
            { value: 20 },
            { value: 35 },
            { value: 28 },
            { value: 45 },
            { value: 38 },
            { value: 55 },
            { value: 48 },
            { value: 62 },
          ]}
        />
        <StatsChartCard
          title={dict.dashboard.stats.activeNow}
          value="147"
          change="+3.2%"
          changeLabel="vs yesterday"
          variant="text"
          data={[
            { value: 80 },
            { value: 95 },
            { value: 70 },
            { value: 120 },
            { value: 100 },
            { value: 130 },
            { value: 110 },
            { value: 147 },
          ]}
        />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">
              {dict.dashboard.stats.totalRevenue}
            </p>
            <p className="mt-1 text-3xl font-bold">$48,352</p>
          </CardContent>
        </Card>
        <StatsProgressCard
          title={dict.dashboard.stats.pendingTasks}
          value={6}
          total={23}
          label="6 completed today"
        />
      </div>

      {/* Recent Items Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentItemsCard
          title={dict.dashboard.recentOrders.title}
          subtitle={dict.dashboard.recentOrders.subtitle}
          viewAllHref={`/${lang}/dashboard/orders-invoices`}
          viewAllLabel={dict.dashboard.viewAll}
          items={recentOrders}
          emptyMessage={dict.dashboard.recentOrders.empty}
        />
        <RecentItemsCard
          title={dict.dashboard.recentUsers.title}
          subtitle={dict.dashboard.recentUsers.subtitle}
          viewAllHref={`/${lang}/dashboard/users`}
          viewAllLabel={dict.dashboard.viewAll}
          items={recentUsers}
          emptyMessage={dict.dashboard.recentUsers.empty}
        />
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
