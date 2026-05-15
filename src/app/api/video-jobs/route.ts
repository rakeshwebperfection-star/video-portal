import { NextResponse } from "next/server";
import { createVideoJob, VideoFormat, VideoJobInput } from "@/lib/video-jobs";

export const runtime = "nodejs";

const formats = new Set(["mp4", "webm", "mov", "gif"]);

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.prompt || typeof body.prompt !== "string") {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const format = formats.has(body.format) ? (body.format as VideoFormat) : "mp4";
  const input: VideoJobInput = {
    prompt: body.prompt,
    model: body.model ?? "cinematic-pro",
    duration: body.duration ?? "5",
    resolution: body.resolution ?? "1080p",
    aspectRatio: body.aspectRatio ?? "16:9",
    format,
    fps: body.fps ?? "24",
    camera: body.camera ?? "push",
    lighting: body.lighting ?? "neon",
    seed: body.seed ?? "48291",
    negativePrompt: body.negativePrompt ?? "",
    motionStrength: Number(body.motionStrength ?? 68),
    styleStrength: Number(body.styleStrength ?? 74),
  };

  const job = createVideoJob(input);
  return NextResponse.json({ job }, { status: 202 });
}
