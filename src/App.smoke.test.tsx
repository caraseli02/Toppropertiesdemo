import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component smoke test", () => {
  it("renders the TopProperties title", () => {
    render(<App />);
    expect(screen.getByText(/TopProperties/i)).toBeInTheDocument();
  });

  it("renders the prompt composer textarea", () => {
    render(<App />);
    expect(screen.getByLabelText(/Describe the home/i)).toBeInTheDocument();
  });
});
