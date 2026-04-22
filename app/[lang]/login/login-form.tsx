import { DotPattern } from "@/components/dot-pattern";

export function DotFieldBackground() {
  return (
    <DotPattern
      className="text-primary-foreground/15"
      dotSize={1}
      dotSpacing={20}
    />
  );
}
