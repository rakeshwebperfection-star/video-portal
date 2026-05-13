import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:shadow-[0_0_28px_rgba(124,58,237,0.35)]",
        gradient:
          "bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white shadow-[0_0_36px_rgba(124,58,237,0.45)] hover:shadow-[0_0_48px_rgba(56,189,248,0.35)]",
        ghost: "text-slate-200 hover:bg-white/10 hover:text-white",
        outline:
          "border border-white/10 bg-white/5 text-slate-100 hover:border-violet-400/60 hover:bg-violet-500/10",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
