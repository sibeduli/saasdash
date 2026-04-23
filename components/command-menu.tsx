"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  BarChart3,
  FileBarChart,
  Gauge,
  UserCog,
  ListTodo,
  TicketCheck,
  Moon,
  Sun,
  Monitor,
  Languages,
} from "lucide-react";
import { useTheme } from "@wrksz/themes/client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface CommandMenuProps {
  lang: string;
  dict: {
    sidebar: Record<string, string>;
    commandMenu: {
      placeholder: string;
      noResults: string;
      navigation: string;
      theme: string;
      language: string;
      light: string;
      dark: string;
      system: string;
      english: string;
      indonesian: string;
    };
  };
}

const navigationItems = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "chartsGraphs", href: "/dashboard/charts-graphs", icon: BarChart3 },
  { key: "reports", href: "/dashboard/reports", icon: FileBarChart },
  { key: "metrics", href: "/dashboard/metrics", icon: Gauge },
  { key: "users", href: "/dashboard/users", icon: Users },
  { key: "products", href: "/dashboard/products", icon: Package },
  { key: "ordersInvoices", href: "/dashboard/orders-invoices", icon: FileText },
  { key: "shipments", href: "/dashboard/shipments", icon: Truck },
  { key: "payments", href: "/dashboard/payments", icon: CreditCard },
  { key: "inventory", href: "/dashboard/inventory", icon: Boxes },
  { key: "orderCart", href: "/dashboard/order-cart", icon: ShoppingCart },
  {
    key: "orderSingular",
    href: "/dashboard/order-singular",
    icon: ClipboardList,
  },
  { key: "mapPin", href: "/dashboard/map-pin", icon: MapPin },
  { key: "payment", href: "/dashboard/payment", icon: Wallet },
  { key: "qrScanner", href: "/dashboard/qr-scanner", icon: QrCode },
  { key: "uploadingFiles", href: "/dashboard/uploading-files", icon: Upload },
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
];

export function CommandMenu({ lang, dict }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder={dict.commandMenu.placeholder} />
        <CommandList>
          <CommandEmpty>{dict.commandMenu.noResults}</CommandEmpty>
          <CommandGroup heading={dict.commandMenu.navigation}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const label = dict.sidebar[item.key] || item.key;
              return (
                <CommandItem
                  key={item.key}
                  onSelect={() =>
                    runCommand(() => router.push(`/${lang}${item.href}`))
                  }
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={dict.commandMenu.theme}>
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>{dict.commandMenu.light}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>{dict.commandMenu.dark}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>{dict.commandMenu.system}</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={dict.commandMenu.language}>
            <CommandItem
              onSelect={() =>
                runCommand(() => {
                  const path = window.location.pathname.replace(
                    /^\/(en|id)/,
                    "/en"
                  );
                  router.push(path);
                })
              }
            >
              <Languages className="mr-2 h-4 w-4" />
              <span>🇺🇸 {dict.commandMenu.english}</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => {
                  const path = window.location.pathname.replace(
                    /^\/(en|id)/,
                    "/id"
                  );
                  router.push(path);
                })
              }
            >
              <Languages className="mr-2 h-4 w-4" />
              <span>🇮🇩 {dict.commandMenu.indonesian}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
