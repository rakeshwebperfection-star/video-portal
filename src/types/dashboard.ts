import { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
}

export interface Creation {
  title: string;
  duration: string;
  resolution: string;
  ratio: string;
  createdAt: string;
  image: string;
}

export interface Template {
  title: string;
  prompt: string;
  image: string;
  badge?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
