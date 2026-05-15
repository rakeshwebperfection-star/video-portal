import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export type VideoFormat = "mp4" | "webm" | "mov" | "gif";
export type VideoStatus = "queued" | "processing" | "completed" | "failed";

export interface VideoJobInput {
  prompt: string;
  model: string;
  duration: string;
  resolution: string;
  aspectRatio: string;
  format: VideoFormat;
  fps: string;
  camera: string;
  lighting: string;
  seed: string;
  negativePrompt: string;
  motionStrength: number;
  styleStrength: number;
}

export interface VideoJob {
  id: string;
  input: VideoJobInput;
  status: VideoStatus;
  progress: number;
  step: string;
  createdAt: string;
  updatedAt: string;
  outputUrl?: string;
  downloadUrl?: string;
  fileName?: string;
  error?: string;
}

const globalJobs = globalThis as typeof globalThis & { vidoraJobs?: Map<string, VideoJob> };
export const jobs = globalJobs.vidoraJobs ?? new Map<string, VideoJob>();
globalJobs.vidoraJobs = jobs;

const steps = ["Analyzing Prompt", "Rendering Frames", "Enhancing Motion", "Finalizing Video"];

function dimensions(resolution: string, aspectRatio: string) {
  const base = resolution === "720p" ? 720 : resolution === "2k" ? 1440 : resolution === "4k" ? 2160 : 1080;
  if (aspectRatio === "9:16") return { width: Math.round((base * 9) / 16), height: base };
  if (aspectRatio === "1:1") return { width: base, height: base };
  if (aspectRatio === "21:9") return { width: Math.round((base * 21) / 9), height: base };
  return { width: Math.round((base * 16) / 9), height: base };
}

function codecArgs(format: VideoFormat) {
  if (format === "webm") return ["-c:v", "libvpx-vp9", "-b:v", "1.5M", "-an"];
  if (format === "gif") return ["-vf", "fps=12,scale=640:-1:flags=lanczos", "-loop", "0"];
  return ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];
}

export function createVideoJob(input: VideoJobInput) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const job: VideoJob = { id, input, status: "queued", progress: 4, step: steps[0], createdAt: now, updatedAt: now };
  jobs.set(id, job);
  void renderVideo(job);
  return job;
}

export function getVideoJob(id: string) {
  return jobs.get(id);
}

function updateJob(id: string, patch: Partial<VideoJob>) {
  const current = jobs.get(id);
  if (!current) return;
  jobs.set(id, { ...current, ...patch, updatedAt: new Date().toISOString() });
}

async function renderVideo(job: VideoJob) {
  try {
    updateJob(job.id, { status: "processing", progress: 18, step: steps[0] });
    const duration = Math.max(3, Math.min(Number.parseInt(job.input.duration, 10) || 5, 30));
    const fps = Math.max(12, Math.min(Number.parseInt(job.input.fps, 10) || 24, 60));
    const { width, height } = dimensions(job.input.resolution, job.input.aspectRatio);
    const safeFormat = job.input.format;
    const fileName = `${job.id}.${safeFormat}`;
    const outputDir = path.join(process.cwd(), "public", "generated");
    const outputPath = path.join(outputDir, fileName);
    await mkdir(outputDir, { recursive: true });

    updateJob(job.id, { progress: 35, step: steps[1] });
    const hue = Math.abs([...job.input.prompt].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 360;
    const source = `testsrc2=size=${width}x${height}:rate=${fps}:duration=${duration}`;
    const filter = safeFormat === "gif" ? `hue=h=${hue},format=rgb24` : `hue=h=${hue},format=yuv420p`;
    const args = ["-y", "-f", "lavfi", "-i", source, "-vf", filter, "-t", String(duration), ...codecArgs(safeFormat), outputPath];

    updateJob(job.id, { progress: 58, step: steps[2] });
    const binary = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
    const ffmpegPath = path.join(process.cwd(), "node_modules", "@ffmpeg-installer", `${process.platform}-${process.arch}`, binary);
    await execFileAsync(ffmpegPath, args, { windowsHide: true, timeout: 120000 });
    updateJob(job.id, {
      status: "completed",
      progress: 100,
      step: steps[3],
      outputUrl: `/generated/${fileName}`,
      downloadUrl: `/api/video-jobs/${job.id}/download`,
      fileName,
    });
  } catch (error) {
    updateJob(job.id, { status: "failed", progress: 100, step: "Failed", error: error instanceof Error ? error.message : "Video generation failed" });
  }
}


