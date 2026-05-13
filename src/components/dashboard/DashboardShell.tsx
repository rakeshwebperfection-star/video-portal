"use client";

import { motion } from "framer-motion";
import { CreditCard, HelpCircle, ImageIcon, LayoutGrid, Settings, Sparkles, Text, Wand2 } from "lucide-react";
import * as React from "react";
import { GenerateVideoPanel } from "@/components/dashboard/GenerateVideoPanel";
import { RecentCreations } from "@/components/dashboard/RecentCreations";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TemplatesCarousel } from "@/components/dashboard/TemplatesCarousel";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { promptPresets } from "@/data/dashboard";
import { ToastStateProvider } from "@/hooks/use-toast";
import { Creation } from "@/types/dashboard";

const viewCopy: Record<string, { icon: React.ElementType; title: string; description: string; action: string }> = {
  "Image to Video": {
    icon: ImageIcon,
    title: "Image to Video",
    description: "Upload a visual reference and transform it into cinematic motion with Vidora AI.",
    action: "Start Image Workflow",
  },
  "Text to Video": {
    icon: Text,
    title: "Text to Video",
    description: "Turn structured story prompts into polished short-form video concepts.",
    action: "Open Text Studio",
  },
  "AI Tools": {
    icon: Wand2,
    title: "AI Tools",
    description: "Enhance prompts, remix styles, upscale previews, and prepare production variants.",
    action: "Explore Tools",
  },
  Billing: {
    icon: CreditCard,
    title: "Billing",
    description: "Manage credits, invoices, plan upgrades, and usage limits for your workspace.",
    action: "Manage Plan",
  },
  Settings: {
    icon: Settings,
    title: "Settings",
    description: "Tune generation defaults, notification preferences, and workspace controls.",
    action: "Open Settings",
  },
  "Help & Support": {
    icon: HelpCircle,
    title: "Help & Support",
    description: "Find workflow guides, contact support, and review Vidora AI best practices.",
    action: "Contact Support",
  },
};

function PlaceholderView({ activeItem }: { activeItem: string }) {
  const copy = viewCopy[activeItem] ?? viewCopy["AI Tools"];
  const Icon = copy.icon;

  return (
    <GlassPanel className="p-6 sm:p-8">
      <div className="flex max-w-2xl flex-col gap-5">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/30 bg-violet-500/15 text-violet-200 shadow-[0_0_30px_rgba(124,58,237,0.25)]">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-medium text-sky-300">{activeItem}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">{copy.title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">{copy.description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Credits ready", "Fast render", "Cloud sync"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
              {item}
            </div>
          ))}
        </div>
        <Button variant="gradient" className="w-fit">
          <Sparkles className="h-4 w-4" />
          {copy.action}
        </Button>
      </div>
    </GlassPanel>
  );
}

export function DashboardShell() {
  const [activeItem, setActiveItem] = React.useState("Home");
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [prompt, setPrompt] = React.useState(
    "A futuristic city with flying cars at sunset, ultra realistic, cinematic, 4k",
  );

  const duplicateCreation = (creation: Creation) => {
    setPrompt(`${creation.title}: cinematic AI video, ${creation.resolution}, ${creation.ratio}, premium lighting, smooth camera motion`);
    setActiveItem("Generate Video");
  };

  const renderMainView = () => {
    if (activeItem === "My Creations") {
      return (
        <RecentCreations
          expanded
          onViewAll={() => setActiveItem("My Creations")}
          onDuplicate={duplicateCreation}
        />
      );
    }

    if (activeItem === "Templates") {
      return (
        <TemplatesCarousel
          onUseTemplate={(nextPrompt) => {
            setPrompt(nextPrompt);
            setActiveItem("Generate Video");
          }}
        />
      );
    }

    if (activeItem !== "Home" && activeItem !== "Generate Video") {
      return <PlaceholderView activeItem={activeItem} />;
    }

    return (
      <>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <GenerateVideoPanel prompt={prompt} setPrompt={setPrompt} />
          <RecentCreations
            onViewAll={() => setActiveItem("My Creations")}
            onDuplicate={duplicateCreation}
          />
        </div>
        <div className="mt-4">
          <TemplatesCarousel
            onUseTemplate={(nextPrompt) => {
              setPrompt(nextPrompt);
              setActiveItem("Generate Video");
            }}
          />
        </div>
      </>
    );
  };

  return (
    <ToastStateProvider>
      <div className="min-h-screen overflow-x-hidden bg-[#06070A] text-slate-100">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[8%] top-[8%] h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
            animate={{ y: [0, 18, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[4%] top-[28%] h-96 w-96 rounded-full bg-sky-500/16 blur-3xl"
            animate={{ y: [0, -24, 0], x: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#17255455,transparent_36%),linear-gradient(135deg,#06070A_0%,#0B1020_48%,#06070A_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="relative flex">
          <Sidebar
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          <div className="min-w-0 flex-1">
            <TopNavbar />
            <main className="p-4 pt-5 sm:p-6">{renderMainView()}</main>
          </div>
        </div>
        <Toaster />
      </div>
    </ToastStateProvider>
  );
}
