"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { GenerateVideoPanel } from "@/components/dashboard/GenerateVideoPanel";
import {
  AIToolsPage,
  BillingPage,
  HomePage,
  MediaToVideoPage,
  SettingsPage,
  SupportPage,
} from "@/components/dashboard/MenuPages";
import { RecentCreations } from "@/components/dashboard/RecentCreations";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TemplatesCarousel } from "@/components/dashboard/TemplatesCarousel";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Toaster } from "@/components/ui/toaster";
import { ToastStateProvider } from "@/hooks/use-toast";
import { Creation } from "@/types/dashboard";

export function DashboardShell() {
  const [activeItem, setActiveItem] = React.useState("Home");
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [prompt, setPrompt] = React.useState(
    "A futuristic city with flying cars at sunset, ultra realistic, cinematic, 4k",
  );

  const openGeneratorWithPrompt = (nextPrompt: string) => {
    setPrompt(nextPrompt);
    setActiveItem("Generate Video");
  };

  const duplicateCreation = (creation: Creation) => {
    openGeneratorWithPrompt(
      `${creation.title}: cinematic AI video, ${creation.resolution}, ${creation.ratio}, premium lighting, smooth camera motion`,
    );
  };

  const renderMainView = () => {
    switch (activeItem) {
      case "Home":
        return <HomePage onNavigate={setActiveItem} />;
      case "Generate Video":
        return (
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
            <GenerateVideoPanel prompt={prompt} setPrompt={setPrompt} />
            <RecentCreations onViewAll={() => setActiveItem("My Creations")} onDuplicate={duplicateCreation} />
          </div>
        );
      case "Image to Video":
        return <MediaToVideoPage mode="image" onSendToGenerator={openGeneratorWithPrompt} />;
      case "Text to Video":
        return <MediaToVideoPage mode="text" onSendToGenerator={openGeneratorWithPrompt} />;
      case "My Creations":
        return <RecentCreations expanded onViewAll={() => setActiveItem("My Creations")} onDuplicate={duplicateCreation} />;
      case "Templates":
        return <TemplatesCarousel expanded onUseTemplate={openGeneratorWithPrompt} />;
      case "AI Tools":
        return <AIToolsPage prompt={prompt} setPrompt={setPrompt} />;
      case "Billing":
        return <BillingPage />;
      case "Settings":
        return <SettingsPage />;
      case "Help & Support":
        return <SupportPage />;
      default:
        return <HomePage onNavigate={setActiveItem} />;
    }
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
            <TopNavbar onNavigate={setActiveItem} />
            <main className="p-4 pt-5 sm:p-6">{renderMainView()}</main>
          </div>
        </div>
        <Toaster />
      </div>
    </ToastStateProvider>
  );
}
