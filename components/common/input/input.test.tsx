import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./input.component";

describe("Input Component", () => {
  it("should render input with label", () => {
    render(<Input label="Username" onChange={() => {}} />);

    expect(screen.getByLabelText(/username/i)).toBeTruthy();
  });

  it("calls the onChange handler when the input value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should show error message when error prop is passed", () => {
    render(
      <Input
        label="Username"
        error="This field is required"
        onChange={() => {}}
      />
    );

    expect(screen.getByText(/this field is required/i)).toBeTruthy();
  });
});
