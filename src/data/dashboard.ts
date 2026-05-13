import {
  BadgeHelp,
  Clapperboard,
  CreditCard,
  Home,
  ImageIcon,
  LayoutGrid,
  Settings,
  Sparkles,
  Text,
  Wand2,
  Video,
} from "lucide-react";
import { Creation, MenuItem, SelectOption, Template } from "@/types/dashboard";

export const menuItems: MenuItem[] = [
  { label: "Home", icon: Home },
  { label: "Generate Video", icon: Sparkles },
  { label: "Image to Video", icon: ImageIcon },
  { label: "Text to Video", icon: Text },
  { label: "My Creations", icon: Video },
  { label: "Templates", icon: LayoutGrid },
  { label: "AI Tools", icon: Wand2 },
  { label: "Billing", icon: CreditCard },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: BadgeHelp },
];

export const suggestionChips = [
  "Cyberpunk City",
  "Beautiful Landscape",
  "Warrior in Battle",
  "Space Exploration",
  "Cute Animals",
];

export const promptPresets: Record<string, string> = {
  "Cyberpunk City":
    "A neon cyberpunk megacity at sunset with flying cars, reflective rain streets, cinematic lighting, ultra realistic, 4k",
  "Beautiful Landscape":
    "A breathtaking alpine valley with glowing wildflowers, drifting morning mist, sweeping camera movement, cinematic realism",
  "Warrior in Battle":
    "A heroic warrior crossing a smoky battlefield with sparks, dramatic slow motion, intense camera push, epic fantasy style",
  "Space Exploration":
    "An astronaut exploring a crystalline moon cave beneath a giant blue planet, volumetric light, cinematic sci-fi realism",
  "Cute Animals":
    "A tiny red panda wearing a space helmet floating gently through a colorful nebula, adorable, soft cinematic lighting",
};

export const modelOptions: SelectOption[] = [
  { label: "Cinematic Pro", value: "cinematic-pro" },
  { label: "Realistic XL", value: "realistic-xl" },
  { label: "Anime Vision", value: "anime-vision" },
  { label: "Hyper 3D", value: "hyper-3d" },
];

export const durationOptions: SelectOption[] = [
  { label: "5 sec", value: "5" },
  { label: "10 sec", value: "10" },
  { label: "15 sec", value: "15" },
  { label: "30 sec", value: "30" },
];

export const resolutionOptions: SelectOption[] = [
  { label: "720p", value: "720p" },
  { label: "1080p", value: "1080p" },
  { label: "2K", value: "2k" },
  { label: "4K", value: "4k" },
];

export const aspectOptions: SelectOption[] = [
  { label: "16:9", value: "16:9" },
  { label: "9:16", value: "9:16" },
  { label: "1:1", value: "1:1" },
  { label: "21:9", value: "21:9" },
];

export const fpsOptions: SelectOption[] = [
  { label: "24 FPS", value: "24" },
  { label: "30 FPS", value: "30" },
  { label: "60 FPS", value: "60" },
];

export const cameraOptions: SelectOption[] = [
  { label: "Cinematic Push", value: "push" },
  { label: "Orbit Pan", value: "orbit" },
  { label: "Drone Sweep", value: "drone" },
  { label: "Static Frame", value: "static" },
];

export const lightingOptions: SelectOption[] = [
  { label: "Neon Noir", value: "neon" },
  { label: "Golden Hour", value: "golden" },
  { label: "Studio Softbox", value: "studio" },
  { label: "Volumetric Rays", value: "volumetric" },
];

export const processingSteps = [
  "Analyzing Prompt",
  "Rendering Frames",
  "Enhancing Motion",
  "Finalizing Video",
];

const imageBase =
  "https://images.unsplash.com/photo-";

export const recentCreations: Creation[] = [
  {
    title: "Futuristic City",
    duration: "0:05",
    resolution: "1080p",
    ratio: "16:9",
    createdAt: "2 minutes ago",
    image: `${imageBase}1519608487953-e999c86e7455?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Fantasy Castle",
    duration: "0:04",
    resolution: "720p",
    ratio: "16:9",
    createdAt: "1 hour ago",
    image: `${imageBase}1518709268805-4e9042af2176?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Astronaut on Mars",
    duration: "0:06",
    resolution: "1080p",
    ratio: "16:9",
    createdAt: "3 hours ago",
    image: `${imageBase}1446776811953-b23d57bd21aa?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Waterfall in Forest",
    duration: "0:05",
    resolution: "720p",
    ratio: "16:9",
    createdAt: "5 hours ago",
    image: `${imageBase}1432405972618-c60b0225b8f9?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Sunset Ocean",
    duration: "0:04",
    resolution: "720p",
    ratio: "16:9",
    createdAt: "1 day ago",
    image: `${imageBase}1507525428034-b723cf961d3e?auto=format&fit=crop&w=720&q=80`,
  },
];

export const templates: Template[] = [
  {
    title: "Cyberpunk City",
    prompt: promptPresets["Cyberpunk City"],
    badge: "NEW",
    image: `${imageBase}1518005020951-eccb494ad742?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Fantasy World",
    prompt:
      "A majestic fantasy kingdom across a river valley, floating lanterns, sweeping sunrise, elegant cinematic movement",
    image: `${imageBase}1500530855697-b586d89ba3ee?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Space Exploration",
    prompt: promptPresets["Space Exploration"],
    image: `${imageBase}1454789548928-9efd52dc4031?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Tropical Paradise",
    prompt:
      "A crystal clear tropical lagoon with palm trees, sunlit waves, gentle aerial camera glide, premium travel film",
    image: `${imageBase}1500375592092-40eb2168fd21?auto=format&fit=crop&w=720&q=80`,
  },
  {
    title: "Nature Beauty",
    prompt: promptPresets["Beautiful Landscape"],
    image: `${imageBase}1501785888041-af3ef285b470?auto=format&fit=crop&w=720&q=80`,
  },
];

export const workflow = [
  {
    title: "Enter Prompt",
    description: "Describe the video you want to generate",
    icon: Clapperboard,
  },
  {
    title: "AI Processing",
    description: "Our AI renders motion, frames and style",
    icon: Sparkles,
  },
  {
    title: "Get Your Video",
    description: "Preview, download and share your video",
    icon: Video,
  },
];
