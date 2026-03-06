import { render, screen } from "@testing-library/react";
import { CompletionBar } from "@/app/components/CompletionBar";

describe("CompletionBar", () => {
  test("renders a progress bar", () => {
    render(<CompletionBar progress={50} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
  });

  it("sets aria-valuenow to the provided value", () => {
    render(<CompletionBar progress={50} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "50");
  });
  it("clamps aria-valuenow to 0 when progress is negative", () => {
    render(<CompletionBar progress={-20} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
  });
  it("clamps aria-valuenow to 100 when progress exceeds 100", () => {
    render(<CompletionBar progress={120} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
  });
});
