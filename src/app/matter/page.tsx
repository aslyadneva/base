"use client";
import { useState } from "react";
import MatterCard from "../components/MatterCard";
import { Plus } from "lucide-react";
import Accordion from "../components/Accordion";

let id = 0;

const INITIAL_MATTER = [
  {
    id: id++,
    name: "Strategy Session",
    type: "Service",
    duration: "2h",
    description: "",
    notes: "",
    price: 200,
    cost: 40,
  },
  {
    id: id++,
    name: "Starter Kit",
    type: "Package",
    duration: "3 items",
    description:
      "Everything a new client needs to get started. Includes onboarding call, brand template, and 30-day follow-up.",
    notes: "Best seller Q1. Consider adding a digital workbook.",
    price: 350,
    cost: 80,
  },
  {
    id: id++,
    name: "Brand Audit",
    type: "Service",
    duration: "90m",
    description: "",
    notes: "",
    price: 150,
    cost: 30,
  },
];

export default function Matter() {
  const [items, setItems] = useState(INITIAL_MATTER);
  const [newItem, setNewItem] = useState("");

  // const toggleSection = (id: number) => {
  //   console.log("toggleSection id", id);
  //   console.log("openSections before", openSections);

  //   const newSet = new Set(openSections);
  //   console.log("newSet before", newSet);

  //   if (newSet.has(id)) {
  //     console.log("toggling off");
  //     //   // toggle off
  //     newSet.delete(id);
  //   } else {
  //     console.log("toggling on");

  //     // toggle on
  //     newSet.add(id);
  //   }
  //   console.log("newSet after", newSet);
  //   setOpenSections(newSet);
  // };

  const removeItem = (id: number) => {
    console.log("removeItem id", id);
    const filteredItems = items.filter((item) => item.id !== id);

    setItems(filteredItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: id++,
        name: newItem,
        description: "",
        notes: "",
        type: "",
        duration: "",
        price: 0,
        cost: 0,
      },
    ]);
    setNewItem("");
  };

  return (
    <div className="flex-1 bg-white px-9 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-[22px] font-semibold text-foreground tracking-[-0.03em]">
              Matter
            </h1>
            {items.length > 0 && (
              <span className="text-xs text-chart-5">{items.length}</span>
            )}
          </div>
          <p className="text-[13px] text-muted-foreground mt-1 tracking-[-0.005em]">
            Everything your business is made of
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          {/* View toggle */}
          <div className="flex bg-black/[0.04] rounded-lg p-0.5">
            <button className="px-3 py-[5px] rounded-md bg-white text-[11.5px] font-medium text-[#1c1b18] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              All
            </button>
            <button className="px-3 py-[5px] rounded-md text-[11.5px] text-[#9b968c]">
              By category
            </button>
          </div>

          {/* Add button */}
          {/* <button className="w-7 h-7 rounded-[7px] bg-[#1c1b18] flex items-center justify-center">
            <Plus className="w-[11px] h-[11px] text-white" strokeWidth={2.5} />
          </button> */}
        </div>
      </div>

      {/*Input */}
      <div className="flex items-center gap-2.5 mb-7">
        <input
          type="text"
          placeholder="New matter"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addItem();
          }}
          className="flex-1 h-9 px-3 rounded-md border border-border bg-[#faf9f7] text-[13px] text-foreground placeholder:text-[#b5b0a6] outline-none focus:border-ring transition-colors"
        />
        <button
          onClick={addItem}
          className="h-9 w-9 rounded-md bg-foreground flex items-center justify-center flex-shrink-0"
        >
          <Plus className="w-[13px] h-[13px] text-white" strokeWidth={2.5} />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5">
        <Accordion sections={items}>
          {({ section, toggleSection, isExpanded }) => (
            <MatterCard
              isExpanded={isExpanded}
              toggleSection={toggleSection}
              removeItem={removeItem}
              {...section}
            />
          )}
        </Accordion>
      </div>
    </div>
  );
}
