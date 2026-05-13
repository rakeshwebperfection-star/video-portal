"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Cpu,
  Lightbulb,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import * as React from "react";
import {
  aspectOptions,
  cameraOptions,
  durationOptions,
  fpsOptions,
  lightingOptions,
  modelOptions,
  processingSteps,
  promptPresets,
  resolutionOptions,
  suggestionChips,
  workflow,
} from "@/data/dashboard";
import { FieldLabel } from "@/components/common/FieldLabel";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SelectOption } from "@/types/dashboard";

function SettingSelect({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function GenerateVideoPanel({
  prompt,
  setPrompt,
}: {
  prompt: string;
  setPrompt: (prompt: string) => void;
}) {
  const [model, setModel] = React.useState("cinematic-pro");
  const [duration, setDuration] = React.useState("5");
  const [resolution, setResolution] = React.useState("1080p");
  const [aspect, setAspect] = React.useState("16:9");
  const [fps, setFps] = React.useState("24");
  const [motionStrength, setMotionStrength] = React.useState([68]);
  const [styleStrength, setStyleStrength] = React.useState([74]);
  const [camera, setCamera] = React.useState("push");
  const [lighting, setLighting] = React.useState("neon");
  const [seed, setSeed] = React.useState("48291");
  const [negativePrompt, setNegativePrompt] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!isGenerating) return;

    setProgress(0);
    setStepIndex(0);
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 4, 100);
        setStepIndex(Math.min(Math.floor(next / 25), processingSteps.length - 1));

        if (next >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => {
            setIsGenerating(false);
            setSuccessOpen(true);
            toast({
              title: "Video generation complete",
              description: "Your cinematic AI video is ready for preview.",
            });
          }, 450);
        }

        return next;
      });
    }, 160);

    return () => window.clearInterval(interval);
  }, [isGenerating, toast]);

  const enhancePrompt = () => {
    const base = prompt.trim() || promptPresets["Cyberpunk City"];
    setPrompt(
      `${base}, cinematic composition, volumetric lighting, detailed motion, premium lens flare, ultra realistic texture, smooth camera movement`,
    );
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt needed",
        description: "Add a video idea or choose a suggestion chip first.",
      });
      return;
    }

    setIsGenerating(true);
  };

  return (
    <>
      <GlassPanel className="overflow-hidden p-4 sm:p-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Generate AI Video
            </h1>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Describe your idea and let AI turn it into stunning videos
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-inner">
            <FieldLabel label="Prompt" value={`${prompt.length}/1000`} />
            <div className="relative">
              <Textarea
                maxLength={1000}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="A futuristic city with flying cars at sunset, ultra realistic, cinematic, 4k"
                className="min-h-32 pr-14"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-3 right-3"
                onClick={enhancePrompt}
                aria-label="Enhance prompt"
              >
                <Lightbulb className="h-4 w-4 text-sky-300" />
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-slate-400">Try these ideas:</span>
              {suggestionChips.map((chip) => (
                <motion.button
                  key={chip}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPrompt(promptPresets[chip])}
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-slate-300 transition hover:border-violet-300/50 hover:text-white hover:shadow-[0_0_22px_rgba(124,58,237,0.24)]"
                >
                  {chip}
                </motion.button>
              ))}
              <Button variant="outline" size="sm" onClick={enhancePrompt}>
                <Sparkles className="h-4 w-4 text-violet-300" />
                AI Enhance
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-[#06070A]/35 p-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <SettingSelect label="AI Model" options={modelOptions} value={model} onValueChange={setModel} />
              <SettingSelect label="Duration" options={durationOptions} value={duration} onValueChange={setDuration} />
              <SettingSelect label="Resolution" options={resolutionOptions} value={resolution} onValueChange={setResolution} />
              <SettingSelect label="Aspect Ratio" options={aspectOptions} value={aspect} onValueChange={setAspect} />
            </div>

            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="advanced" className="shadow-[0_0_28px_rgba(124,58,237,0.12)]">
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <SlidersHorizontal className="h-4 w-4 text-sky-300" />
                    Advanced Settings
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <SettingSelect label="FPS" options={fpsOptions} value={fps} onValueChange={setFps} />
                    <SettingSelect label="Camera Movement" options={cameraOptions} value={camera} onValueChange={setCamera} />
                    <div>
                      <FieldLabel label="Motion Strength" value={`${motionStrength[0]}%`} />
                      <Slider value={motionStrength} onValueChange={setMotionStrength} max={100} step={1} />
                    </div>
                    <div>
                      <FieldLabel label="Style Strength" value={`${styleStrength[0]}%`} />
                      <Slider value={styleStrength} onValueChange={setStyleStrength} max={100} step={1} />
                    </div>
                    <div>
                      <FieldLabel label="Seed" />
                      <Input value={seed} onChange={(event) => setSeed(event.target.value)} />
                    </div>
                    <SettingSelect label="Lighting Mode" options={lightingOptions} value={lighting} onValueChange={setLighting} />
                    <div className="md:col-span-2">
                      <FieldLabel label="Negative Prompt" />
                      <Textarea
                        value={negativePrompt}
                        onChange={(event) => setNegativePrompt(event.target.value)}
                        placeholder="Low quality, blur, distorted hands, unwanted text"
                        className="min-h-24"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-5 flex flex-col items-center gap-3">
              <Button
                variant="gradient"
                size="lg"
                className="w-full max-w-sm"
                disabled={isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <>
                    <Cpu className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Video
                  </>
                )}
              </Button>
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4" />
                Your video will be generated in 2-5 minutes
              </p>
            </div>

            <AnimatePresence>
              {isGenerating ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-5 rounded-2xl border border-sky-300/20 bg-sky-400/5 p-4"
                >
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{processingSteps[stepIndex]}</span>
                    <span className="text-sky-200">{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-400"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <h2 className="text-sm font-semibold text-white">How it works</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {workflow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.title}>
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-sky-400 font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{step.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{step.description}</p>
                      </div>
                      <Icon className="ml-auto hidden h-5 w-5 text-violet-300 xl:block" />
                    </div>
                    {index < workflow.length - 1 ? (
                      <div className="hidden place-items-center text-slate-500 md:grid">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>
      </GlassPanel>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 shadow-[0_0_36px_rgba(52,211,153,0.35)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-center text-2xl">Video Ready</DialogTitle>
            <DialogDescription className="text-center">
              Vidora AI finished rendering your preview. Your dashboard is ready for the next generation.
            </DialogDescription>
          </DialogHeader>
          <Button variant="gradient" onClick={() => setSuccessOpen(false)}>
            View Generated Video
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
