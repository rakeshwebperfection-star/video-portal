import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getVideoJob } from "@/lib/video-jobs";

export const runtime = "nodejs";

const contentTypes: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  gif: "image/gif",
};

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const job = getVideoJob(params.id);
  if (!job || job.status !== "completed" || !job.fileName) {
    return NextResponse.json({ error: "Video is not ready" }, { status: 404 });
  }
  const filePath = path.join(process.cwd(), "public", "generated", job.fileName);
  const file = await readFile(filePath);
  const format = job.fileName.split(".").pop() ?? "mp4";
  return new NextResponse(file, {
    headers: {
      "Content-Type": contentTypes[format] ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="vidora-${job.fileName}"`,
    },
  });
}
