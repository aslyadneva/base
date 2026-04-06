import { useState } from "react";

interface TransducerField {
  label: string;
}

interface TransducerProps {
  a: TransducerField;
  b: TransducerField;
  transduce: (value: number) => number;
  invert: (value: number) => number;
  precision?: number;
}

const Transducer = ({
  a,
  b,
  transduce,
  invert,
  precision = 0,
}: TransducerProps) => {
  const [aValue, setAValue] = useState("");
  const [bValue, setBValue] = useState("");

  function format(val: number, precision = 0): string {
    return val.toFixed(precision);
  }

  function convert(val: number, convertFn: (val: number) => number) {
    return convertFn(val);
  }

  function isValid(val: string) {
    return val !== "";
  }

  function handleConvert(newValue: string, convertFn: (val: number) => number) {
    if (isValid(newValue)) {
      const convertedOtherValue = convert(Number(newValue), convertFn);
      return format(convertedOtherValue, precision);
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="mb-2">
        <label className="text-[11px] text-[#b5b0a6] mb-1 block">
          {a.label}
          <input
            type="number"
            value={aValue}
            onChange={(e) => {
              setAValue(e.target.value);
              const convertedValue = handleConvert(e.target.value, transduce);
              setBValue(convertedValue);
            }}
            className="w-full bg-white border border-[#e8e5df] rounded-[5px] px-2.5 py-[7px] text-[13px] text-[#1c1b18] outline-none focus:border-[#c2b09a] transition-colors mt-1"
          />
        </label>
      </div>

      {/* Separator */}
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 h-px bg-[#e8e5df]" />
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          className="text-[#c2b09a] flex-shrink-0"
        >
          <path
            d="M1 3H8.5M8.5 3L6.5 1M8.5 3L6.5 5"
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M11 5H3.5M3.5 5L5.5 3M3.5 5L5.5 7"
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex-1 h-px bg-[#e8e5df]" />
      </div>

      <div className="mb-2.5">
        <label className="text-[11px] text-[#b5b0a6] mb-1 block">
          {b.label}
          <input
            type="number"
            value={bValue}
            onChange={(e) => {
              setBValue(e.target.value);
              const convertedValue = handleConvert(e.target.value, invert);
              setAValue(convertedValue);
            }}
            className="w-full bg-white border border-[#e8e5df] rounded-[5px] px-2.5 py-[7px] text-[13px] text-[#1c1b18] outline-none focus:border-[#c2b09a] transition-colors"
          />
        </label>
      </div>
    </>
  );
};

export default Transducer;
