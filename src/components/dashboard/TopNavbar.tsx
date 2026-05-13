"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  CreditCard,
  LogOut,
  Search,
  Settings,
  User,
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

export function TopNavbar() {
  return (
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
          <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white sm:flex">
            <Zap className="h-4 w-4 fill-amber-300 text-amber-300" />
            <span>120 Credits</span>
          </div>
          <Button variant="gradient" className="hidden sm:inline-flex">
            Upgrade
          </Button>
          <Button variant="ghost" size="icon" className="relative text-slate-300">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
          </Button>

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
              <DropdownMenuItem>
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-rose-200 focus:text-rose-100">
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative mt-3 md:hidden">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input placeholder="Search Vidora AI..." className="h-11 rounded-2xl pl-11" />
      </div>
    </motion.header>
  );
}
