"use client";
import { LucideIcon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../../../components/ui/button";
import { useEditorStore } from "@/store/use-editor-store";

interface ToolBarSectionProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolBarButton = ({
  onClick,
  isActive = false,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={cn(
        "test-sm h-7 min-w-7 justify-center items-center flex rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80",
      )}
    >
      <Icon className="size-4" />
    </Button>
  );
};

function ToolBar() {
  const { editor } = useEditorStore();

  const sections: ToolBarSectionProps[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          editor?.chain().focus().undo().run();
        },
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[1.5rem] min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
      {sections.map((section, index) => (
        <div key={index} className="flex items-center gap-x-0.5">
          {section.map((item) => (
            <ToolBarButton
              key={item.label}
              icon={item.icon}
              onClick={item.onClick}
              isActive={item.isActive}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ToolBar;
