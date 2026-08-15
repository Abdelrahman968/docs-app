"use client";

import {
  ALargeSmall,
  BoldIcon,
  CheckIcon,
  FileType,
  FileTypeCorner,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  TypeOutline,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/use-editor-store";
import { useEditorState } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { fonts } from "@/constants/fonts";
import { heading } from "@/constants/heading";
import { Sketch } from "@uiw/react-color";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const ImageBTN = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
        setIsDialogOpen(false);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          title="Insert Image"
          render={
            <Button
              variant="outline"
              className="h-7 shrink-0 flex flex-col items-center justify-center gap-0"
            >
              <ImageIcon />
            </Button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <SearchIcon className="size-4 mr-2" />
            Image Url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
            <DialogDescription className={"flex flex-col gap-2"}>
              <span>Enter the image URL you want to insert.</span>
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleImageUrlSubmit();
                  }
                }}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkBTN = () => {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setValue(editor?.getAttributes("link").href || "");
    }
  };

  const normalizeUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (!/^https?:\/\//i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const handleConfirm = () => {
    const href = normalizeUrl(value);

    if (!href) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }

    setOpen(false);
  };

  const handleRemoveLink = () => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setValue("");
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        title="Insert Link"
        render={
          <Button
            variant="outline"
            className="h-7 shrink-0 flex flex-col items-center justify-center gap-0"
          >
            <Link2Icon />
          </Button>
        }
      />
      <DropdownMenuContent className="p-2.5 w-full overflow-hidden flex items-center gap-x-2">
        <Input
          placeholder="https://..."
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") {
              e.preventDefault();
              handleConfirm();
            }
          }}
          className="focus:outline-none"
          autoFocus
        />
        {value && (
          <Button
            variant="outline"
            onClick={handleRemoveLink}
            title="Remove Link"
          >
            <XIcon className="size-4" />
          </Button>
        )}
        <Button variant="outline" onClick={handleConfirm} title="Confirm">
          <CheckIcon />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
            <div className="border-l-2 border-neutral-300 pl-1">
              <TextColoBTN />
            </div>
          )}
          {index === 1 && (
            <div>
              <HightLightBTN />
            </div>
          )}
          {index === 1 && (
            <div>
              <LinkBTN />
            </div>
          )}
          {index === 1 && (
            <div>
              <ImageBTN />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ToolBar;
