import { useState } from "react";

interface DotProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  filled?: boolean;
}

const Dot = ({
  filled = true,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: DotProps) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    className={`w-9 h-2 rounded-full cursor-pointer transition-colors ${filled ? "bg-ring" : "bg-[#ebe8e2]"}`}
  />
);

const ScalarInput = ({
  interval,
  measure,
  setMeasure,
}: {
  interval: number;
  measure: number;
  setMeasure: (index: number) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  const isFilled = function (
    index: number,
    measure: number,
    hoveredIndex: number | null,
  ) {
    // Normalize: convert 1-based measure to 0-based threshold
    const committedThreshold = measure - 1;

    const activeThreshold =
      hoveredIndex !== null ? hoveredIndex : committedThreshold;

    return index <= activeThreshold;
  };

  return (
    <div className="flex gap-1.5">
      {Array.from({ length: interval }).map((_, index) => {
        const isDotFilled = isFilled(index, measure, hoveredIndex);

        return (
          <Dot
            key={index}
            filled={isDotFilled}
            onMouseEnter={() => {
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
            }}
            onClick={() => setMeasure(index)}
          />
        );
      })}
    </div>
  );
};

export default ScalarInput;
