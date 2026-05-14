import { render, screen } from "@testing-library/react";
import { BearPun } from "./BearPun";

test("BearPun renders the pun text", () => {
  render(<BearPun pun={"Just bear with me."} />);
  expect(screen.getByText("Just bear with me.")).toBeInTheDocument();
});
