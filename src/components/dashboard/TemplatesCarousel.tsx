"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { ArrowRight, Grid2X2, WandSparkles } from "lucide-react";
import { templates } from "@/data/dashboard";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function TemplatesCarousel({
  onUseTemplate,
  expanded = false,
}: {
  onUseTemplate: (prompt: string) => void;
  expanded?: boolean;
}) {
  const [allOpen, setAllOpen] = React.useState(false);
  const listClass = expanded ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "scrollbar-hide flex gap-4 overflow-x-auto pb-1";

  const TemplateCard = ({ template, index }: { template: (typeof templates)[number]; index: number }) => (
    <motion.article
      key={template.title}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className={`group relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl ${expanded ? "" : "min-w-[250px] sm:min-w-[300px]"}`}
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
        <h3 className="truncate text-sm font-semibold text-white">{template.title}</h3>
        <Button variant="default" size="sm" onClick={() => onUseTemplate(template.prompt)}>
          <WandSparkles className="h-4 w-4" />
          Use
        </Button>
      </div>
    </motion.article>
  );

  return (
    <>
      <GlassPanel className="p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">{expanded ? "All Templates" : "Popular Templates"}</h2>
          <Button variant="outline" size="sm" className="text-violet-200" onClick={() => setAllOpen(true)}>
            <Grid2X2 className="h-4 w-4" />
            View All Templates
          </Button>
        </div>

        <div className={listClass}>
          {templates.map((template, index) => (
            <TemplateCard key={template.title} template={template} index={index} />
          ))}
          {!expanded ? (
            <button onClick={() => setAllOpen(true)} className="grid h-40 min-w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white">
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </GlassPanel>

      <Dialog open={allOpen} onOpenChange={setAllOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>All Vidora Templates</DialogTitle>
            <DialogDescription>Choose any template and it will autofill the generator prompt.</DialogDescription>
          </DialogHeader>
          <div className="grid max-h-[65vh] gap-4 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template, index) => (
              <TemplateCard key={template.title} template={template} index={index} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
