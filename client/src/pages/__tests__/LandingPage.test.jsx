import React from "react";
import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../LandingPage";
import { BrowserRouter, Router } from "react-router-dom";

test("LandingPage contains logo image", () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
  const imageLogo = screen.queryByTestId("imageLogo");
  expect(imageLogo).toBeDefined();
});
