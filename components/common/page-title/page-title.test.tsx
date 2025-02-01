import { render } from "@testing-library/react";
import { PageTitle } from "./page-title";

describe("PageTitle Component", () => {
  it("should render page title", () => {
    const { getByText } = render(<PageTitle title="Test Title" />);
    expect(getByText(/test title/i)).toBeTruthy();
  });
});
