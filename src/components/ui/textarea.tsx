import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[110px] w-full resize-none rounded-xl border border-white/10 bg-[#06070A]/70 px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/60 focus:ring-2 focus:ring-violet-500/20",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
