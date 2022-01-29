import React from "react";
import { render, cleanup } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);
// test render app
it("renders without crashing", () => {
  render(<Application />);
});
