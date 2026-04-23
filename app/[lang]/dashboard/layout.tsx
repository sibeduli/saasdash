import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { CommandMenu } from "@/components/command-menu";
import { SearchButton } from "@/components/search-button";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar lang={lang} dict={dict} />
      <CommandMenu lang={lang} dict={dict} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-border flex h-16 items-center justify-end gap-2 border-b px-6">
          <SearchButton placeholder={dict.commandMenu.placeholder} />
          <ThemeToggle />
          <LanguageToggle />
        </header>
        {/* Main content */}
        <main className="bg-background flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
