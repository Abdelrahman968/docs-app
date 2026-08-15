import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  LucideIcon,
} from "lucide-react";

export const alignments: readonly {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Align Left",
    value: "left",
    icon: AlignLeftIcon,
  },
  {
    label: "Align Center",
    value: "center",
    icon: AlignCenterIcon,
  },
  {
    label: "Align Right",
    value: "right",
    icon: AlignRightIcon,
  },
  {
    label: "Align Justify",
    value: "justify",
    icon: AlignJustifyIcon,
  },
] as const;
