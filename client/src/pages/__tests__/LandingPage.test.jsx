import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../LandingPage";

describe("LandingPage", () => {
  it("LandingPage contains logo image", () => {
    //const logo = "../assets/logo_d.png";
    const { getByRole } = render(<LandingPage />);
    const imgTag = getByRole("img");
    fireEvent.click(imgTag);
    //expect(imgTag).toBe("../assets/logo_d.png")
  });
});
