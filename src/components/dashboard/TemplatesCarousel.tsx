"use client";

import { motion } from "framer-motion";
import { ArrowRight, WandSparkles } from "lucide-react";
import { templates } from "@/data/dashboard";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/ui/button";

export function TemplatesCarousel({
  onUseTemplate,
}: {
  onUseTemplate: (prompt: string) => void;
}) {
  return (
    <GlassPanel className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Popular Templates</h2>
        <Button variant="outline" size="sm" className="hidden text-violet-200 sm:inline-flex">
          View All Templates
        </Button>
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-1">
        {templates.map((template, index) => (
          <motion.article
            key={template.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            className="group relative h-36 min-w-[250px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl sm:min-w-[300px]"
          >
            <img
              src={template.image}
              alt={template.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {template.badge ? (
              <span className="absolute right-3 top-3 rounded-lg bg-cyan-300 px-2 py-1 text-[10px] font-bold text-slate-950">
                {template.badge}
              </span>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white">{template.title}</h3>
              </div>
              <Button
                variant="default"
                size="sm"
                className="translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
                onClick={() => onUseTemplate(template.prompt)}
              >
                <WandSparkles className="h-4 w-4" />
                Use
              </Button>
            </div>
          </motion.article>
        ))}
        <button className="grid h-36 min-w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white">
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </GlassPanel>
  );
}
