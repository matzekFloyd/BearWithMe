import { render } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  let header = document.getElementById('app-header');
  expect(header).toBeInTheDocument();
});

test("renders main", () => {
  render(<App />);
  let main = document.getElementById('app-main');
  expect(main).toBeInTheDocument();
});

test("renders footer", () => {
  render(<App />);
  let footer = document.getElementById("app-footer");
  expect(footer).toBeInTheDocument();
});