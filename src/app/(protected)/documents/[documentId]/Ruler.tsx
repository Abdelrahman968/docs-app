"use client";

import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useRef, useState } from "react";

import { FaCaretDown } from "react-icons/fa";

const PAGE_WIDTH = 816;
const DEFAULT_MARGIN = 56;
const MIN_CONTENT_SPACE = 100;

const markers = Array.from({ length: 83 }, (_, index) => index);

const Ruler = () => {
  const leftMargin = useStorage((root) => root.leftMargin) ?? 56;
  const rightMargin = useStorage((root) => root.rightMargin) ?? 56;

  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargin", position);
  }, []);

  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargin", position);
  }, []);

  const [dragging, setDragging] = useState<"left" | "right" | null>(null);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (type: "left" | "right") => {
    setDragging(type);
  };

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!dragging || !rulerRef.current) {
        return;
      }

      const container = rulerRef.current.querySelector(
        "[data-ruler-container]",
      );

      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const position = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

      if (dragging === "left") {
        const maxleftMargin = PAGE_WIDTH - rightMargin - MIN_CONTENT_SPACE;
        setLeftMargin(Math.min(position, maxleftMargin));
      }

      if (dragging === "right") {
        const maxrightMargin = PAGE_WIDTH - leftMargin - MIN_CONTENT_SPACE;
        const right = PAGE_WIDTH - position;
        setRightMargin(Math.min(Math.max(0, right), maxrightMargin));
      }
    },
    [dragging, leftMargin, rightMargin, setLeftMargin, setRightMargin],
  );

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const handleWindowMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX);
    };

    const handleWindowMouseUp = () => {
      setDragging(null);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);

      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [dragging, updatePosition]);

  const resetLeft = () => {
    setLeftMargin(DEFAULT_MARGIN);
  };

  const resetRight = () => {
    setRightMargin(DEFAULT_MARGIN);
  };

  return (
    <div
      ref={rulerRef}
      className="
        relative
        mx-auto
        h-8
        w-204
        select-none
        border-b
        border-border
        bg-background
        print:hidden
      "
    >
      <div data-ruler-container className="relative h-full w-204">
        <Marker
          position={leftMargin}
          side="left"
          isDragging={dragging === "left"}
          onMouseDown={() => handleMouseDown("left")}
          onDoubleClick={resetLeft}
        />

        <Marker
          position={rightMargin}
          side="right"
          isDragging={dragging === "right"}
          onMouseDown={() => handleMouseDown("right")}
          onDoubleClick={resetRight}
        />

        <div className="absolute inset-0">
          {markers.map((marker) => {
            const position = (marker * PAGE_WIDTH) / 82;

            const isMajor = marker % 10 === 0;
            const isMedium = marker % 5 === 0 && !isMajor;

            return (
              <div
                key={marker}
                className="absolute bottom-0"
                style={{
                  left: `${position}px`,
                }}
              >
                {isMajor && (
                  <>
                    <div
                      className="
                        absolute
                        bottom-0
                        h-2.5
                        w-px
                        bg-muted-foreground
                      "
                    />

                    <span
                      className="
                        absolute
                        bottom-2.5
                        left-1/2
                        -translate-x-1/2
                        text-[9px]
                        font-medium
                        text-muted-foreground
                      "
                    >
                      {marker / 10 + 1}
                    </span>
                  </>
                )}

                {isMedium && (
                  <div
                    className="
                      absolute
                      bottom-0
                      h-1.5
                      w-px
                      bg-muted-foreground/70
                    "
                  />
                )}

                {!isMajor && !isMedium && (
                  <div
                    className="
                      absolute
                      bottom-0
                      h-1
                      w-px
                      bg-muted-foreground/50
                    "
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ruler;

interface MarkerProps {
  position: number;
  side: "left" | "right";
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  side,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="
        group
        absolute
        top-0
        z-20
        h-full
        w-5
        -translate-x-1/2
        cursor-ew-resize
      "
      style={{
        [side === "left" ? "left" : "right"]: `${position}px`,
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown();
      }}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown
        className="
          absolute
          left-1/2
          top-0
          h-4
          w-4
          -translate-x-1/2
          fill-primary
          drop-shadow-sm
          transition-transform
          group-hover:scale-110
        "
      />

      {isDragging && (
        <div
          className="
            pointer-events-none
            fixed
            left-1/2
            top-7
            z-50
            h-screen
            w-px
            -translate-x-1/2
            bg-primary
          "
        />
      )}
    </div>
  );
};
