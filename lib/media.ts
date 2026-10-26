import { existsSync } from "node:fs";
import path from "node:path";

const publicDirectory = path.join(process.cwd(), "public");

const cloudCandidates = [
  "/images/clouds/cloud-1.webp",
  "/images/clouds/cloud-2.webp",
  "/images/clouds/cloud-3.webp",
  "/images/clouds/cloud-4.webp",
  "/images/clouds/cloud-5.webp",
] as const;

function publicFileExists(publicPath: string): boolean {
  return existsSync(path.join(publicDirectory, publicPath.replace(/^\//, "")));
}

export function hasCloudLayers(): boolean {
  return cloudCandidates.every(publicFileExists);
}

export function hasPortrait(): boolean {
  return publicFileExists("/images/portrait.jpg");
}
