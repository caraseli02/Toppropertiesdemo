import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VillaPreview } from "./VillaPreview";

const mock = vi.hoisted(() => ({
  create: vi.fn(),
  runtime: { setView: vi.fn(), setHour: vi.fn(), setPlaying: vi.fn(), dispose: vi.fn() },
}));
vi.mock("./villaScene", () => ({ createVillaScene: mock.create }));

describe("architectural preview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mock.create.mockReturnValue(mock.runtime);
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("starts on the photo and releases the renderer when returning to it", async () => {
    render(<VillaPreview image="/test-villa.jpg" />);
    expect(mock.create).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Explore in 3D" }));
    await waitFor(() => expect(mock.create).toHaveBeenCalledOnce());
    fireEvent.click(screen.getByRole("button", { name: "Photo" }));
    expect(mock.runtime.dispose).toHaveBeenCalledOnce();
  });

  it("passes view, daylight and pause changes to the scene", async () => {
    render(<VillaPreview image="/test-villa.jpg" />);
    fireEvent.click(screen.getByRole("button", { name: "Explore in 3D" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Garden" })).toBeEnabled());
    fireEvent.click(screen.getByRole("button", { name: "Garden" }));
    expect(mock.runtime.setView).toHaveBeenLastCalledWith("garden");
    fireEvent.change(screen.getByRole("slider", { name: /Daylight/ }), { target: { value: "18" } });
    expect(mock.runtime.setHour).toHaveBeenLastCalledWith(18);
    fireEvent.click(screen.getByRole("button", { name: "Pause camera orbit" }));
    expect(mock.runtime.setPlaying).toHaveBeenLastCalledWith(false);
  });

  it("keeps the photo and reports unavailable 3D if initialization fails", async () => {
    mock.create.mockImplementation(() => {
      throw new Error("No WebGL");
    });
    render(<VillaPreview image="/test-villa.jpg" />);
    fireEvent.click(screen.getByRole("button", { name: "Explore in 3D" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/3D isn’t available/));
    expect(screen.getByRole("button", { name: "Photo" })).toHaveAttribute("aria-pressed", "true");
  });

  it("starts without camera animation when reduced motion is requested", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
    render(<VillaPreview image="/test-villa.jpg" />);
    fireEvent.click(screen.getByRole("button", { name: "Explore in 3D" }));
    await waitFor(() => expect(mock.runtime.setPlaying).toHaveBeenCalledWith(false));
    expect(
      screen.getByRole("button", { name: "Animation disabled for reduced motion" }),
    ).toBeDisabled();
  });
});
