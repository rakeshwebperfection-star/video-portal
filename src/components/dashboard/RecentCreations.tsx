"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { Copy, Download, Eye, MoreVertical, Play } from "lucide-react";
import { recentCreations } from "@/data/dashboard";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Creation } from "@/types/dashboard";

export function RecentCreations({
  expanded = false,
  onViewAll,
  onDuplicate,
}: {
  expanded?: boolean;
  onViewAll?: () => void;
  onDuplicate?: (creation: Creation) => void;
}) {
  const [selectedVideo, setSelectedVideo] = React.useState<Creation | null>(null);
  const { toast } = useToast();
  const visibleCreations = expanded ? recentCreations : recentCreations.slice(0, 5);

  const downloadCreation = (video: Creation) => {
    const payload = {
      title: video.title,
      duration: video.duration,
      resolution: video.resolution,
      aspectRatio: video.ratio,
      createdAt: video.createdAt,
      asset: video.image,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${video.title.toLowerCase().replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download started",
      description: `${video.title} metadata has been exported.`,
    });
  };

  const duplicateCreation = (video: Creation) => {
    onDuplicate?.(video);
    toast({
      title: "Prompt duplicated",
      description: `${video.title} is ready in the generator.`,
    });
  };

  return (
    <>
      <GlassPanel className="h-full p-4 xl:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Creations</h2>
          <Button variant="outline" size="sm" className="text-violet-200" onClick={onViewAll}>
            View All
          </Button>
        </div>

        <div className={expanded ? "grid gap-3 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}>
          {visibleCreations.map((video, index) => (
            <motion.article
              key={video.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.015 }}
              className="group grid grid-cols-[128px_1fr_auto] gap-3 rounded-2xl border border-transparent p-2 transition hover:border-violet-400/40 hover:bg-white/[0.04] hover:shadow-[0_0_28px_rgba(124,58,237,0.22)]"
            >
              <button
                className="relative h-20 overflow-hidden rounded-xl bg-white/5 text-left focus:outline-none focus:ring-2 focus:ring-sky-300"
                onClick={() => setSelectedVideo(video)}
                aria-label={`Preview ${video.title}`}
              >
                <img
                  src={video.image}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/35">
                  <Play className="h-8 w-8 scale-75 rounded-full bg-white/15 p-2 text-white opacity-0 backdrop-blur-md transition group-hover:scale-100 group-hover:opacity-100" />
                </div>
                <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-0.5 text-xs text-white backdrop-blur">
                  {video.duration}
                </span>
              </button>

              <div className="min-w-0 py-1">
                <h3 className="truncate text-sm font-semibold text-white">{video.title}</h3>
                <p className="mt-2 text-xs text-slate-400">
                  {video.resolution} - {video.ratio}
                </p>
                <p className="mt-4 text-xs text-slate-500">{video.createdAt}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedVideo(video)}>
                    <Eye className="h-4 w-4" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadCreation(video)}>
                    <Download className="h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => duplicateCreation(video)}>
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.article>
          ))}
        </div>
      </GlassPanel>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-2xl">
          {selectedVideo ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedVideo.title}</DialogTitle>
                <DialogDescription>
                  {selectedVideo.resolution} - {selectedVideo.ratio} - {selectedVideo.duration}
                </DialogDescription>
              </DialogHeader>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
                <img
                  src={selectedVideo.image}
                  alt={selectedVideo.title}
                  className="h-72 w-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/25">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white backdrop-blur-xl">
                    <Play className="h-8 w-8 fill-white" />
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" onClick={() => downloadCreation(selectedVideo)}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="gradient" onClick={() => duplicateCreation(selectedVideo)}>
                  <Copy className="h-4 w-4" />
                  Duplicate Prompt
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
