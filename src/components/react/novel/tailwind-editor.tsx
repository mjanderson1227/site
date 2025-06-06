"use client";

import useDebouncedCallback from "@/lib/hooks/useDebouncedCallback";
import { Input } from "@/components/ui/input";
import {
  EditorContent,
  EditorRoot,
  EditorCommand,
  EditorCommandList,
  EditorCommandItem,
  EditorBubble,
  EditorCommandEmpty,
  handleCommandNavigation,
  type EditorInstance,
  type JSONContent,
  Color,
  TextStyle,
  HighlightExtension,
} from "novel";
import { LinkSelector } from "./link-selector";
import { NodeSelector } from "./node-selector";
import { ColorSelector } from "./color-selector";
import { TextButtons } from "./text-buttons";
import { useCallback, useState } from "react";
import { defaultExtensions } from "@/lib/novel/extensions";
import { slashCommand, suggestionItems } from "@/lib/novel/suggestions";

const extensions = [
  ...defaultExtensions,
  slashCommand,
  Color,
  TextStyle,
  HighlightExtension,
];

interface TailwindEditorProps {
  existingContent?: JSONContent;
}

export default function TailwindEditor({
  existingContent,
}: TailwindEditorProps) {
  const [postTitle, setPostTitle] = useState("Post Title");
  const [content, setContent] = useState(existingContent);
  const [openLink, setOpenLink] = useState(false);
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const handleUpdate = useDebouncedCallback(
    async ({ editor }: { editor: EditorInstance }) => {
      const json = editor.getJSON();
      setContent(json);
    },
    1000,
  );

  const handleCreate = () => {};

  return (
    <EditorRoot>
      <Input
        className="text-2xl font-bold mb-4 ring-0"
        value={postTitle}
        onChange={(content) => setPostTitle(content.target.value)}
      />
      <EditorContent
        initialContent={content}
        onUpdate={handleUpdate}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
      >
        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <TextButtons />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
        <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command && item.command(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
}
