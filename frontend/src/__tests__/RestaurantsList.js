import React from "react";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import RestaurantsList from "../components/RestaurantList";

// mock RestaurantsDataService to avoid actual API calls
jest.mock("../services/RestaurantService", () => ({
  getAll: () => Promise.resolve({ data: [{ id: 1, name: "Restaurant 1" }] }),
  findByName: () =>
    Promise.resolve({ data: [{ id: 1, name: "Restaurant 1" }] }),
  deleteAll: () => Promise.resolve({ data: "Successfully deleted." }),
}));

describe("RestaurantsList component", () => {
  test("renders correctly without errors", async () => {
    render(<RestaurantsList />);

    await waitFor(() => {
      expect(screen.getByText("Restaurants List")).toBeInTheDocument();
    });
  });
});
