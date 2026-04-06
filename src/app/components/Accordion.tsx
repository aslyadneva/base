import { Fragment, useState } from "react";

interface AccordionItem {
  id: number;
}

const Accordion = <T extends AccordionItem>({
  sections,
  children,
}: {
  sections: T[];
  children: (props: {
    section: T;
    isExpanded: boolean;
    toggleSection: (id: number) => void;
  }) => React.ReactNode;
}) => {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const toggleSection = (id: number) => {
    const newSet = new Set(openSections);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setOpenSections(newSet);
  };

  console.log("sections", sections);

  return (
    <>
      {sections.map((section) => (
        <Fragment key={section.id}>
          {children({
            section,
            isExpanded: openSections.has(section.id),
            toggleSection,
          })}
        </Fragment>
      ))}
    </>
  );
};

export default Accordion;
