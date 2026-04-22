"use client";

import DotField from "@/components/DotField";

export function DotFieldBackground() {
  return (
    <div className="absolute inset-0">
      <DotField
        dotRadius={1}
        dotSpacing={20}
        gradientFrom="rgba(255,255,255,0.3)"
        gradientTo="rgba(255,255,255,0.15)"
      />
    </div>
  );
}
