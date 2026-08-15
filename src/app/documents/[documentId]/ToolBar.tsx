"use client";

import {
  ALargeSmall,
  BoldIcon,
  FileType,
  FileTypeCorner,
  HighlighterIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  TypeOutline,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/use-editor-store";
import { useEditorState } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { fonts } from "@/constants/fonts";
import { heading } from "@/constants/heading";
import { Sketch } from "@uiw/react-color";

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

const HightLightBTN = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#000000";

  const onChange = (color: { hex: string }) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        title="HightLight TXT"
        render={
          <Button
            variant="outline"
            className="h-7 shrink-0 flex flex-col items-center justify-center gap-0"
          >
            <HighlighterIcon />
          </Button>
        }
      />
      <DropdownMenuContent className="p-0 w-full overflow-hidden">
        <Sketch
          color={value}
          onChange={onChange}
          style={{ boxShadow: "none" }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColoBTN = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: { hex: string }) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        title="Color TXT"
        render={
          <Button
            variant="outline"
            className="h-7 shrink-0 flex flex-col items-center justify-center gap-0"
          >
            <span className="text-xs">A</span>
            <div style={{ backgroundColor: value }} className="h-0.5 w-full" />
          </Button>
        }
      />
      <DropdownMenuContent className="p-0 w-full overflow-hidden">
        <Sketch
          color={value}
          onChange={onChange}
          style={{ boxShadow: "none" }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Heading = ({
  headingValue,
  headingLabel,
}: {
  headingValue: string;
  headingLabel: string;
}) => {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false);

  const handleHeadingChange = (value: string) => {
    const level = Number(value);
    if (level === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <ALargeSmall /> {headingLabel}
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Heading</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={headingValue}
            onValueChange={handleHeadingChange}
          >
            {heading.map(({ fontSize, label, value }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <TypeOutline />
                <span style={{ fontSize }}>{label}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyBTN = ({ fontFamily }: { fontFamily: string }) => {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false);

  const handleFontChange = (value: string) => {
    editor?.chain().focus().setFontFamily(value).run();
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" style={{ fontFamily }}>
            <FileType /> {fontFamily}
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Font Family</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={fontFamily}
            onValueChange={handleFontChange}
          >
            {fonts.map((font) => (
              <DropdownMenuRadioItem key={font.label} value={font.value}>
                <FileTypeCorner />
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const currentHeading = heading.find(({ value }) =>
        ctx.editor?.isActive("heading", { level: Number(value) }),
      );

      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        isUnderline: ctx.editor?.isActive("underline") ?? false,
        isTaskList: ctx.editor?.isActive("taskList") ?? false,
        isSpellCheck:
          ctx.editor?.view.dom.getAttribute("spellcheck") === "true",
        fontFamily:
          ctx.editor?.getAttributes("textStyle").fontFamily || "Arial",
        headingValue: currentHeading?.value ?? "0",
        headingLabel: currentHeading?.label ?? "Normal Text",
      };
    },
  });

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
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: handleSpellCheck,
        isActive: editorState?.isSpellCheck,
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editorState?.isBold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editorState?.isItalic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editorState?.isUnderline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => alert("Comment feature is not implemented yet."),
      },
      {
        label: "List TODO",
        icon: ListTodoIcon,
        isActive: editorState?.isTaskList,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
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
          {index === 0 && (
            <div className="border-l-2 border-neutral-300 pl-1">
              <FontFamilyBTN fontFamily={editorState?.fontFamily ?? "Arial"} />
            </div>
          )}
          {index === 0 && (
            <div>
              <Heading
                headingValue={String(editorState?.headingValue ?? "0")}
                headingLabel={editorState?.headingLabel ?? "Normal Text"}
              />
            </div>
          )}
          {index === 1 && (
            <div>
              <TextColoBTN />
            </div>
          )}
          {index === 1 && (
            <div>
              <HightLightBTN />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ToolBar;
