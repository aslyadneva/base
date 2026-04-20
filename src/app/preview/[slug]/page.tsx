"use client";
import ScalarInput from "@/app/components/ScalarInput";
import { useParams } from "next/navigation";
import { useState } from "react";

function ScalarInputPreview() {
  const [measure, setMeasure] = useState(3);
  return (
    <ScalarInput
      interval={6}
      measure={measure}
      setMeasure={(i) => setMeasure(i + 1)}
    />
  );
}

const previews: Record<string, React.ComponentType> = {
  "scalar-input": ScalarInputPreview,
};

export default function PreviewHome() {
  const { slug } = useParams<{ slug: string }>();
  const Component = previews[slug];

  if (!Component) {
    return (
      <p className="text-sm text-muted-foreground">No preview for "{slug}"</p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center p-10">
      <Component />
    </div>
  );
}
