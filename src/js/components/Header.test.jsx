import { render } from "@testing-library/react";
import { Header } from "./Header";

test("renders header", () => {
  render(<Header />);
  let header = document.getElementById('app-header');
  expect(header).toBeInTheDocument();
});
