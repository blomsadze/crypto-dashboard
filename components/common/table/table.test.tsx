import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "./table.component";
import { ColumnDef } from "@tanstack/react-table";
import "@testing-library/jest-dom";

describe("Table Component", () => {
  // Sample data and columns for testing
  const columns: ColumnDef<{ name: string; age: number }>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
  ];

  const data = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
  ];

  it("renders the table with columns and data", () => {
    render(<Table columns={columns} data={data} />);

    // Check if column headers are rendered
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Age")).toBeTruthy();

    // Check if data rows are rendered
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("25")).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
    expect(screen.getByText("30")).toBeTruthy();
  });

  it("filters the table when the global filter input is used", () => {
    render(<Table columns={columns} data={data} />);

    // Type into the global filter input
    const filterInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(filterInput, { target: { value: "Alice" } });

    // Check if only the filtered row is rendered
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.queryByText("Bob")).not.toBeTruthy();
    expect(screen.queryByText("Charlie")).not.toBeTruthy();
  });
});
