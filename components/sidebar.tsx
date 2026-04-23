"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Truck,
  CreditCard,
  Boxes,
  ShoppingCart,
  ClipboardList,
  MapPin,
  Wallet,
  QrCode,
  Upload,
  Shield,
  ToggleLeft,
  ShieldAlert,
  Activity,
  Download,
  ScrollText,
  LogOut,
  ChevronLeft,
  ChevronDown,
  BarChart3,
  FileBarChart,
  Gauge,
  UserCog,
  ListTodo,
  TicketCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  lang: string;
  dict: {
    sidebar: Record<string, string>;
    common: {
      appName: string;
    };
  };
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavItem {
  key: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navGroups: NavGroup[] = [
  {
    label: "",
    items: [{ key: "dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Analytics",
    items: [
      {
        key: "chartsGraphs",
        href: "/dashboard/charts-graphs",
        icon: BarChart3,
      },
      { key: "reports", href: "/dashboard/reports", icon: FileBarChart },
      { key: "metrics", href: "/dashboard/metrics", icon: Gauge },
    ],
  },
  {
    label: "Master Data",
    items: [
      { key: "users", href: "/dashboard/users", icon: Users },
      { key: "products", href: "/dashboard/products", icon: Package },
      {
        key: "ordersInvoices",
        href: "/dashboard/orders-invoices",
        icon: FileText,
      },
      { key: "shipments", href: "/dashboard/shipments", icon: Truck },
      { key: "payments", href: "/dashboard/payments", icon: CreditCard },
      { key: "inventory", href: "/dashboard/inventory", icon: Boxes },
    ],
  },
  {
    label: "Operation",
    items: [
      { key: "orderCart", href: "/dashboard/order-cart", icon: ShoppingCart },
      {
        key: "orderSingular",
        href: "/dashboard/order-singular",
        icon: ClipboardList,
      },
      { key: "mapPin", href: "/dashboard/map-pin", icon: MapPin },
      { key: "payment", href: "/dashboard/payment", icon: Wallet },
      { key: "qrScanner", href: "/dashboard/qr-scanner", icon: QrCode },
      {
        key: "uploadingFiles",
        href: "/dashboard/uploading-files",
        icon: Upload,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        key: "memberManagement",
        href: "/dashboard/member-management",
        icon: UserCog,
      },
      { key: "taskTracker", href: "/dashboard/task-tracker", icon: ListTodo },
      {
        key: "supportsTickets",
        href: "/dashboard/supports-tickets",
        icon: TicketCheck,
      },
    ],
  },
  {
    label: "Setting",
    items: [
      { key: "roles", href: "/dashboard/roles", icon: Shield },
      { key: "toggles", href: "/dashboard/toggles", icon: ToggleLeft },
      {
        key: "securityEvents",
        href: "/dashboard/security-events",
        icon: ShieldAlert,
      },
      { key: "activityLogs", href: "/dashboard/activity-logs", icon: Activity },
      {
        key: "downloadableAssets",
        href: "/dashboard/downloadable-assets",
        icon: Download,
      },
      {
        key: "termsConditions",
        href: "/dashboard/terms-conditions",
        icon: ScrollText,
      },
    ],
  },
];

export function Sidebar({ lang, dict }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      navGroups.forEach((group) => {
        if (group.label) {
          initial[group.label] = true;
        }
      });
      return initial;
    }
  );

  const isActive = (href: string) => {
    const fullPath = `/${lang}${href}`;
    if (href === "/dashboard") {
      return pathname === fullPath;
    }
    return pathname.startsWith(fullPath);
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      className={cn(
        "bg-card border-border flex h-screen flex-col border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="border-border flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href={`/${lang}/dashboard`} className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <svg
                className="text-primary-foreground h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold">{dict.common.appName}</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {navGroups.map((group, groupIndex) => (
          <div key={group.label || groupIndex} className="mb-2">
            {/* Group header */}
            {group.label && !collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="text-muted-foreground hover:text-foreground mb-1 flex w-full items-center justify-between px-3 py-2 text-xs font-semibold tracking-wider uppercase"
              >
                <span>{group.label}</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    !expandedGroups[group.label] && "-rotate-90"
                  )}
                />
              </button>
            )}

            {/* Group items */}
            {(collapsed || !group.label || expandedGroups[group.label]) && (
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const label =
                    dict.sidebar[item.key as keyof typeof dict.sidebar] ||
                    item.key;
                  const linkContent = (
                    <Link
                      href={`/${lang}${item.href}`}
                      className={cn(
                        "flex items-center rounded-lg py-2 text-sm font-medium transition-colors",
                        collapsed ? "justify-center px-2" : "gap-3 px-3",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{label}</span>}
                    </Link>
                  );

                  if (collapsed) {
                    return (
                      <Tooltip key={item.key}>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{label}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <div key={item.key}>{linkContent}</div>;
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-border space-y-1 border-t p-2">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/${lang}/login`}
                className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center rounded-lg px-2 py-2 text-sm font-medium transition-colors"
              >
                <LogOut className="h-5 w-5 shrink-0" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{dict.sidebar.logout}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            href={`/${lang}/login`}
            className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>{dict.sidebar.logout}</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
