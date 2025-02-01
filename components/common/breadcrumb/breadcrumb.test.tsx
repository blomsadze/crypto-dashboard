// Breadcrumb.test.tsx
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./breadcrumb.component";
import { usePathname } from "next/navigation";

// Mock the usePathname hook from next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Breadcrumb Component", () => {
  it("should render breadcrumb for root path", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Breadcrumb />);
    // Check if "Home" is rendered
    expect(screen.getByRole("link", { name: /home/i })).toBeTruthy();
    // Check if the breadcrumb has no other segments
    expect(screen.queryByText("/")).toBeNull();
  });

  it("should render breadcrumb with one segment", () => {
    (usePathname as jest.Mock).mockReturnValue("/category");

    render(<Breadcrumb />);

    expect(screen.getByRole("link", { name: /home/i })).toBeTruthy();
    expect(screen.getByText("category")).toBeTruthy();
  });

  it("should render breadcrumb with multiple segments", () => {
    (usePathname as jest.Mock).mockReturnValue("/category/product");

    render(<Breadcrumb />);

    // Check if "Home" is rendered
    expect(screen.getByRole("link", { name: /home/i })).toBeTruthy();
    // Check if "category" and "product" segments are rendered
    expect(screen.getByText("category")).toBeTruthy();
    expect(screen.getByText("product")).toBeTruthy();
  });
});
