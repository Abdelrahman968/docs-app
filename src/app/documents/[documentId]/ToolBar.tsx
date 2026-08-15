"use client";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
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
  label: string;
}

const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label = "",
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
        "text-sm h-7 min-w-7 justify-center items-center flex rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80",
      )}
      aria-label={label}
      title={label}
    >
      <Icon className="size-4" />
    </Button>
  );
};

function ToolBar() {
  const { editor } = useEditorStore();

  const handleSpellCheck = () => {
    if (!editor) return;

    const dom = editor.view.dom;
    const enabled = dom.getAttribute("spellcheck") === "true";

    dom.setAttribute("spellcheck", String(!enabled));
  };

  const sections: ToolBarSectionProps[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => {
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: handleSpellCheck,
        isActive: editor?.view.dom.getAttribute("spellcheck") === "true",
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {
          alert("Comment feature is not implemented yet.");
        },
      },
      {
        label: "List TODO",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[1.5rem] min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
      {sections.map((section, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-x-0.5",
            index !== sections.length - 1 &&
              "border-r-2 border-neutral-300 pr-1",
          )}
        >
          {section.map((item) => (
            <ToolBarButton key={item.label} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ToolBar;
