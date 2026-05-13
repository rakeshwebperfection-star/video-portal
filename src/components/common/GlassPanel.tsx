import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_0_40px_rgba(124,58,237,0.12)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
