"use client";

import { Search } from "lucide-react";

interface SearchButtonProps {
  placeholder: string;
}

export function SearchButton({ placeholder }: SearchButtonProps) {
  const handleClick = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="bg-muted/50 hover:bg-muted text-muted-foreground border-input hidden h-8 w-80 items-center gap-2 rounded-md border px-3 text-sm sm:flex"
    >
      <Search className="h-4 w-4" />
      <span className="flex-1 text-left">{placeholder}</span>
      <kbd className="bg-background pointer-events-none flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
