import { render } from "@testing-library/react";
import { Footer } from "./Footer";

test("renders footer", () => {
  render(<Footer />);
  let footer = document.getElementById("app-footer");
  expect(footer).toBeInTheDocument();
});
