import { render } from "@testing-library/react";
import { Main } from "./Main";

test("renders main", () => {
  render(<Main />);
  let main = document.getElementById("app-main");
  expect(main).toBeInTheDocument();
});
