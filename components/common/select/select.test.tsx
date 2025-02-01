import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "./select.component";

describe("Select Component", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  it("renders the select with an error message", async () => {
    await act(async () => {
      render(
        <Select error="Test Error" options={options} onChange={() => {}} />
      );
    });

    const errorMessage = screen.getByText("Test Error");
    expect(errorMessage).toBeTruthy();
  });
  it("renders the select with a default value", () => {
    render(<Select value="1" options={options} onChange={() => {}} />);
    expect(screen.getByText(/option 1/i)).toBeTruthy();
  });

  it("calls the onChange handler when an option is selected", () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);

    // Open the dropdown
    fireEvent.mouseDown(screen.getByRole("combobox"));

    // Select an option
    fireEvent.click(screen.getByText(/option 1/i));

    expect(handleChange).toHaveBeenCalledWith({
      label: "Option 1",
      value: "1",
    });
  });
});
