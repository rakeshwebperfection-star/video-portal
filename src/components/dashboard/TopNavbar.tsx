"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Download,
  LogOut,
  Search,
  Settings,
  Sparkles,
  User,
  Video,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

export function TopNavbar({
  onNavigate,
}: {
  onNavigate: (item: string) => void;
}) {
  const [creditsOpen, setCreditsOpen] = React.useState(false);
  const { toast } = useToast();

  const notifications = [
    { title: "Futuristic City is ready", detail: "1080p render completed 2 minutes ago", icon: Video },
    { title: "Credits refreshed", detail: "120 credits available in your workspace", icon: Zap },
    { title: "New template pack", detail: "Cyberpunk and product promo templates added", icon: Sparkles },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 border-b border-white/10 bg-[#06070A]/55 px-4 py-4 backdrop-blur-2xl sm:px-6"
      >
        <div className="flex items-center gap-3">
          <div className="relative hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search creations, templates, tools..."
              className="h-12 rounded-2xl pl-11"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCreditsOpen(true)}
              className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-amber-300/50 hover:bg-amber-300/10 sm:flex"
            >
              <Zap className="h-4 w-4 fill-amber-300 text-amber-300" />
              <span>120 Credits</span>
            </button>
            <Button variant="gradient" className="hidden sm:inline-flex" onClick={() => onNavigate("Billing")}>
              Upgrade
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-slate-300">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-white">Notifications</p>
                  <p className="text-xs text-slate-400">Latest updates for Aman Verma</p>
                </div>
                <DropdownMenuSeparator />
                {notifications.map((item) => (
                  <DropdownMenuItem key={item.title} className="items-start gap-3 py-3">
                    <item.icon className="mt-0.5 h-4 w-4 text-sky-300" />
                    <span>
                      <span className="block text-sm text-white">{item.title}</span>
                      <span className="mt-1 block text-xs text-slate-400">{item.detail}</span>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-2xl p-1.5 pr-2 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-300">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"
                    alt="Aman Verma"
                    className="h-10 w-10 rounded-full border border-white/20 object-cover"
                  />
                  <span className="hidden text-sm font-medium xl:block">Aman Verma</span>
                  <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { toast({ title: "Profile opened", description: "Aman Verma profile settings are ready." }); onNavigate("Settings"); }}><User className="h-4 w-4" />Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate("Settings")}><Settings className="h-4 w-4" />Account Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate("Billing")}>
                  <CreditCard className="h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-rose-200 focus:text-rose-100" onClick={() => toast({ title: "Logged out", description: "Demo logout action completed." })}><LogOut className="h-4 w-4" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative mt-3 md:hidden">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input placeholder="Search Vidora AI..." className="h-11 rounded-2xl pl-11" />
        </div>
      </motion.header>

      <Dialog open={creditsOpen} onOpenChange={setCreditsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credits Balance</DialogTitle>
            <DialogDescription>Track usage and add more credits for video generations.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm text-slate-400">Available</p><p className="mt-2 text-2xl font-bold text-white">120</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm text-slate-400">Used</p><p className="mt-2 text-2xl font-bold text-white">380</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm text-slate-400">Plan</p><p className="mt-2 text-2xl font-bold text-white">Pro</p></div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1"><Download className="h-4 w-4" />Usage Report</Button>
            <Button variant="gradient" className="flex-1" onClick={() => { setCreditsOpen(false); onNavigate("Billing"); }}>Buy Credits</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


