import { ChevronDown } from "lucide-react";
import Transducer from "./Transducer";

const MatterCard = ({
  isExpanded,
  name,
  toggleSection,
  removeItem,
  id,
}: {
  id: number;
  isExpanded: boolean;
  name: string;
  toggleSection: (id: number) => void;
  removeItem: (id: number) => void;
}) => {
  return (
    <div
      className={`bg-background rounded-md transition-colors ${
        isExpanded ? "border border-ring/80" : "border border-chart-4/50"
      }`}
    >
      {/* Card header — always visible */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer"
        onClick={() => toggleSection(id)}
      >
        <div>
          <div className="text-[15px] font-semibold text-foreground tracking-[-0.02em]">
            {name}
          </div>

          <div className="text-[11px] text-[#9b968c] mt-0.5">
            {/* {type}
            {duration && ` · ${duration}`} */}
          </div>
        </div>

        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            isExpanded ? "rotate-180 text-[#c2b09a]" : "text-[#b5b0a6]"
          }`}
          strokeWidth={2}
        />
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-5 pb-5">
          <div className="border-t border-[#d4c5b0]/30 pt-4">
            <div className="flex gap-7">
              {/* Left: description & notes */}
              <div className="flex-1">
                <div className="text-[11px] font-semibold text-[#b5b0a6] tracking-[0.06em] uppercase mb-1.5">
                  Description
                </div>
                <div className="text-[13px] text-[#7c786e] leading-relaxed mb-4">
                  "No description yet."
                  {/* {description || "No description yet."} */}
                </div>

                <div className="text-[11px] font-semibold text-[#b5b0a6] tracking-[0.06em] uppercase mb-1.5">
                  Notes
                </div>
                <div className="text-[13px] text-[#7c786e] leading-relaxed">
                  {/* {notes || "No notes yet."} */}
                  "No notes yet."
                </div>
              </div>

              {/* Right: linked price/cost inputs */}
              <div className="w-[200px] flex-shrink-0">
                <div className="text-[11px] font-semibold text-[#b5b0a6] tracking-[0.06em] uppercase mb-2.5">
                  Pricing
                </div>

                <Transducer
                  a={{ label: "Price" }}
                  b={{ label: "Cost" }}
                  transduce={(value) => value * 0.6}
                  invert={(value) => value / 0.6}
                />

                {/* Margin */}
                <div className="bg-[#f4f2ee] rounded-[5px] px-2.5 py-2 flex justify-between items-center">
                  <span className="text-[11px] text-[#9b968c]">Margin</span>
                  <span className="text-xs font-medium text-[#8fa872]">
                    {/* {getMargin(price, cost)}% */}
                    margin %
                  </span>
                </div>
              </div>
            </div>

            {/* Remove */}
            <div className="flex justify-end mt-4 pt-3 border-t border-[#d4c5b0]/20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(id);
                }}
                className="text-[11.5px] font-medium text-[#c2b09a] hover:text-[#9b968c] transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatterCard;
