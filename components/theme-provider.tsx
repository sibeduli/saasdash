import * as React from "react";
import { ThemeProvider as WrkszThemeProvider } from "@wrksz/themes/next";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof WrkszThemeProvider>) {
  return <WrkszThemeProvider {...props}>{children}</WrkszThemeProvider>;
}
