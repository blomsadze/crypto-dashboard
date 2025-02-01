import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tooltip } from "./tooltip.component";

describe("Tooltip Component", () => {
  const mockText = "Tooltip content";
  const mockChildren = <button>Hover me</button>;
  const mockOnShow = jest.fn();
  const mockOnHide = jest.fn();

  it("renders children and shows tooltip when visible", () => {
    render(
      <Tooltip
        text={mockText}
        isVisible={true}
        onShow={mockOnShow}
        onHide={mockOnHide}
      >
        {mockChildren}
      </Tooltip>
    );

    // Verify children are rendered
    expect(screen.getByText("Hover me")).toBeInTheDocument();

    // Verify tooltip content is visible
    expect(screen.getByText(mockText)).toBeInTheDocument();
    expect(screen.getByText(mockText)).toHaveClass("absolute");
  });

  it("does not show tooltip when not visible", () => {
    render(
      <Tooltip
        text={mockText}
        isVisible={false}
        onShow={mockOnShow}
        onHide={mockOnHide}
      >
        {mockChildren}
      </Tooltip>
    );

    expect(screen.queryByText(mockText)).not.toBeInTheDocument();
  });

  it("triggers onShow when mouse enters", () => {
    render(
      <Tooltip
        text={mockText}
        isVisible={false}
        onShow={mockOnShow}
        onHide={mockOnHide}
      >
        {mockChildren}
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText("Hover me").parentElement!);
    expect(mockOnShow).toHaveBeenCalledTimes(1);
  });

  it("triggers onHide when mouse leaves", () => {
    render(
      <Tooltip
        text={mockText}
        isVisible={true}
        onShow={mockOnShow}
        onHide={mockOnHide}
      >
        {mockChildren}
      </Tooltip>
    );

    fireEvent.mouseLeave(screen.getByText("Hover me").parentElement!);
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("has correct positioning classes", () => {
    render(
      <Tooltip
        text={mockText}
        isVisible={true}
        onShow={mockOnShow}
        onHide={mockOnHide}
      >
        {mockChildren}
      </Tooltip>
    );

    const tooltip = screen.getByText(mockText);
    expect(tooltip).toHaveClass("absolute");
    expect(tooltip).toHaveClass("top-full");
    expect(tooltip).toHaveClass("-translate-x-1/2");
  });
});
