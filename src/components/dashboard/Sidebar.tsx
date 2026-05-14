"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Crown, Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { menuItems } from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VidoraLogo } from "@/components/common/VidoraLogo";

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

function SidebarContent({
  activeItem,
  setActiveItem,
  collapsed,
  setCollapsed,
  onNavigate,
}: Omit<SidebarProps, "mobileOpen" | "setMobileOpen"> & {
  onNavigate?: () => void;
}) {
  const navigate = (item: string) => {
    setActiveItem(item);
    onNavigate?.();
  };

  return (
    <TooltipProvider delayDuration={80}>
      <div className="flex h-full flex-col p-4">
        <div className="mb-7 flex items-center justify-between">
          <VidoraLogo compact={collapsed} />
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-slate-300 lg:inline-flex"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = activeItem === item.label;
            const link = (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.025 }}
                onClick={() => navigate(item.label)}
                className={cn(
                  "group flex h-12 items-center gap-3 rounded-xl px-4 text-left text-sm text-slate-300 transition-all hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_24px_rgba(124,58,237,0.22)]",
                  active &&
                    "bg-violet-500/20 text-violet-100 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.28),0_0_28px_rgba(124,58,237,0.22)]",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", active && "text-violet-300")} />
                {!collapsed ? <span>{item.label}</span> : null}
              </motion.button>
            );

            if (!collapsed) return link;

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/85 via-purple-600/70 to-sky-500/30 p-4 shadow-[0_0_40px_rgba(124,58,237,0.35)]"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-fuchsia-300/25 blur-2xl" />
              <Crown className="relative mb-4 h-6 w-6 text-amber-300" />
              <h3 className="relative text-base font-semibold text-white">Upgrade to Pro</h3>
              <p className="relative mt-2 text-sm leading-6 text-violet-50/80">
                Unlock more credits, faster generation and premium AI tools.
              </p>
              <Button variant="gradient" className="relative mt-5 w-full" onClick={() => navigate("Billing")}>
                Upgrade Now
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 bg-white/10 text-white backdrop-blur-xl lg:hidden"
        onClick={() => props.setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <motion.aside
        animate={{ width: props.collapsed ? 88 : 280 }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="sticky top-0 hidden h-screen shrink-0 border-r border-white/10 bg-[#06070A]/70 backdrop-blur-2xl lg:block"
      >
        <SidebarContent {...props} />
      </motion.aside>

      <AnimatePresence>
        {props.mobileOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => props.setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[min(88vw,320px)] border-r border-white/10 bg-[#06070A]/95 backdrop-blur-2xl lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 z-10 text-white"
                onClick={() => props.setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
              <SidebarContent
                {...props}
                collapsed={false}
                onNavigate={() => props.setMobileOpen(false)}
              />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
