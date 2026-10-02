import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("collection discovery", () => {
  beforeEach(() => {
    const stored = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => stored.get(key) ?? null,
        setItem: (key: string, value: string) => stored.set(key, value),
        clear: () => stored.clear(),
      },
    });
    window.location.hash = "#/";
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("carries a home location search through to a matching residence", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Location"), { target: { value: "Cap d'Antibes" } });
    fireEvent.click(screen.getByRole("button", { name: /^Search$/ }));
    expect(
      await screen.findByRole("heading", { name: "Residences", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Search location")).toHaveValue("Cap d'Antibes");
    fireEvent.click(screen.getByRole("link", { name: /^Villa Azure$/ }));
    expect(
      await screen.findByRole("heading", { name: "Villa Azure", level: 1 }),
    ).toBeInTheDocument();
  });

  it("saves a home without navigating and exposes it in saved homes", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: "Save to favorites" })[0]);
    expect(window.location.hash).toBe("#/");
    fireEvent.click(screen.getByRole("button", { name: "Saved properties" }));
    expect(screen.getByRole("heading", { name: "Saved homes" })).toBeInTheDocument();
    expect(window.localStorage.getItem("top_properties_favorites")).toContain("p1");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("heading", { name: "Saved homes" })).not.toBeInTheDocument();
  });

  it("recovers from non-array browser storage", () => {
    window.localStorage.setItem("top_properties_favorites", '{"stale":true}');
    render(<App />);
    expect(screen.getByRole("heading", { name: /A place to live/ })).toBeInTheDocument();
  });
});
