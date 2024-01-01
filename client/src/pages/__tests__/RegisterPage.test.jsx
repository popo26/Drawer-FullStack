import React from "react";
import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "../RegisterPage";
import { BrowserRouter, Router } from "react-router-dom";
import { UserContextProvider } from "../../context/UserContext";

test("Register Page contains register button", () => {
  render(
    <UserContextProvider>
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    </UserContextProvider>
  );

  const registerElement = screen.getByText(/Register/i);
  expect(registerElement).toBeInTheDocument();
});
