"use client";

import { useState } from "react";

// const TODAY = formatDate(new Date());
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateToReturn = [year, month, day].join("-");

  return dateToReturn;
}
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function Flow() {
  const [entryType, setEntryType] = useState<"one-time" | "recurring">(
    "one-time",
  );
  const [date, setDate] = useState(
    formatDate(new Date(Date.now() + DAY_IN_MILLISECONDS)), // Tomorrow.
  );

  const [projection, setProjection] = useState<{
    yearly: string;
    monthly: string;
  }>({ yearly: "", monthly: "" });

  const submitForm: React.SubmitEventHandler<HTMLFormElement> = function (
    event,
  ) {
    // browser doesnt even run submitForm when value of 2nd input is BELOW the MIN
    // this is the built in "validation"
    // any required or invalid inputs in this form will not trigger this function

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.table([...data]);

    // covert amount data from string to number
    const parsedAmount = parseFloat(data.get("amount") as string);

    // retrieve other variables
    const cycle = data.get("cycle");

    const multiplier = cycle === "monthly" ? 12 : 1;

    // perform calculation on data based on inputs
    const yearly = parsedAmount * multiplier;
    const monthly = yearly / 12;

    // format result
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    // setState with result
    setProjection({
      yearly: currencyFormatter.format(yearly),
      monthly: currencyFormatter.format(monthly),
    });
  };

  return (
    <div className="flex-1 bg-white px-9 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-[22px] font-semibold text-foreground tracking-[-0.03em]">
              Flow
            </h1>
          </div>

          <p className="text-[13px] text-muted-foreground mt-1 tracking-[-0.005em]">
            Track what comes in and what goes out
          </p>
        </div>
      </div>

      {/* Section label */}
      <div className="text-[11px] font-semibold text-[#b5b0a6] tracking-[0.06em] uppercase mb-4">
        New entry
      </div>

      {/* Flight Booker pattern: segmented control changes form shape */}
      <div className="inline-flex bg-black/[0.04] rounded-lg p-0.5 mb-7">
        <button
          type="button"
          onClick={() => setEntryType("one-time")}
          className={`px-3 py-[5px] rounded-md text-[11.5px] font-medium ${
            entryType === "one-time"
              ? "bg-white text-[#1c1b18] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              : "text-[#9b968c]"
          }`}
        >
          One-time
        </button>
        <button
          type="button"
          onClick={() => setEntryType("recurring")}
          className={`px-3 py-[5px] rounded-md text-[11.5px] font-medium ${
            entryType === "recurring"
              ? "bg-white text-[#1c1b18] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              : "text-[#9b968c]"
          }`}
        >
          Recurring
        </button>
      </div>

      <form onSubmit={submitForm}>
        <div className="flex gap-2.5 mb-3.5">
          <div className="flex-1">
            <label
              htmlFor="amount"
              className="text-[11px] text-[#b5b0a6] mb-1 block"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              required
              type="number"
              placeholder="0.00"
              step="0.01"
              className="w-full h-9 px-3 rounded-md border border-border bg-white text-[13px] text-foreground outline-none focus:outline-2 focus:outline-ring/50 focus:-outline-offset-1 transition-colors"
            />
          </div>

          <div className="flex-1">
            <label className="text-[11px] text-[#b5b0a6] mb-1 block">
              Date
            </label>
            <input
              required
              name="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              // min={TODAY}
              className="w-full h-9 px-3 rounded-md border border-border bg-white text-[13px] text-foreground outline-none focus:outline-2 focus:outline-ring/50 focus:-outline-offset-1 transition-colors"
            />
          </div>
        </div>

        {/* Conditional fields for recurring */}
        {entryType === "recurring" && (
          <div className="flex gap-2.5 mb-3.5">
            {/* Uncontrolled: read on submit */}
            <div className="flex-1">
              <label className="text-[11px] text-[#b5b0a6] mb-1 block">
                Repeats
              </label>
              <select
                name="cycle"
                defaultValue="monthly"
                className="w-full h-9 px-3 rounded-md border border-border bg-white text-[13px] text-foreground outline-none focus:outline-2 focus:outline-ring/50 focus:-outline-offset-1 transition-colors appearance-none"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Controlled: min constrained by date */}
            <div className="flex-1">
              <label className="text-[11px] text-[#b5b0a6] mb-1 block">
                Until
              </label>
              <input
                required
                type="date"
                name="dateUntil"
                // value={until}
                // onChange={(e) => setUntil(e.target.value)}
                min={date}
                className="w-full h-9 px-3 rounded-md border border-border bg-white text-[13px] text-foreground outline-none focus:outline-2 focus:outline-ring/50 focus:-outline-offset-1 transition-colors"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="h-9 px-5 rounded-md bg-foreground text-[13px] font-medium text-white tracking-[-0.005em] hover:opacity-[0.88] active:scale-[0.98] transition-all"
          >
            Log entry
          </button>
        </div>
      </form>

      {/* <div className="mt-6">
        <div className="text-[11px] font-semibold text-[#b5b0a6] tracking-[0.06em] uppercase mb-3">
          Projection
        </div>
        <div className="flex gap-8">
          <div>
            <div className="text-[24px] font-light tracking-[-0.03em] text-foreground">
              {projection.yearly}
            </div>
            <div className="text-[10.5px] text-[#b5b0a6] mt-0.5">per year</div>
          </div>

          <div>
            <div className="text-[24px] font-light tracking-[-0.03em] text-foreground">
              {projection.monthly}
            </div>
            <div className="text-[10.5px] text-[#b5b0a6] mt-0.5">per month</div>
          </div>
        </div>
      </div> */}

      {/* <div className="flex flex-col gap-2">
        <ScalarInput
          interval={6}
          measure={3}
          setMeasure={(index) => console.log("new measure", index)}
        />
      </div> */}
    </div>
  );
}
