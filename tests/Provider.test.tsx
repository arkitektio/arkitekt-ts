import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppProvider } from "../src/arkitekt/AppProvider";
import React from "react";

describe("Provider test", () => {
  test("Should be initialized", () => {
    render(
      <AppProvider manifest={{ version: "h", identifier: "nffnf" }}>
        <h4>Content</h4>
      </AppProvider>,
    );

    expect(screen.getByText(/Content/i)).toBeDefined();
  });
});
