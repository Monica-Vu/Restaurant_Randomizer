import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RestaurantsList from "../components/RestaurantList";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

// mock RestaurantsDataService to avoid actual API calls
jest.mock("../services/RestaurantService", () => ({
  getAll: () =>
    Promise.resolve({
      data: [
        {
          id: 1,
          name: "Restaurant 1",
          cuisinetype: "Japanese",
          pricerange: "$20 - $50 (CAD)",
        },
        {
          id: 2,
          name: "Restaurant 2",
          cuisinetype: "Korean",
          pricerange: "$10 - $25 (CAD)",
        },
      ],
    }),
  findByName: () =>
    Promise.resolve({
      data: [
        {
          id: 1,
          name: "Restaurant 1",
          cuisinetype: "Japanese",
          pricerange: "$20 - $50 (CAD)",
        },
      ],
    }),
  deleteAll: () => Promise.resolve({ data: "Successfully deleted." }),
}));

describe("RestaurantsList component", () => {
  const customRender = (children) => {
    render(<BrowserRouter> {children} </BrowserRouter>);
  };

  test("renders correctly without errors", async () => {
    customRender(<RestaurantsList />);

    await waitFor(() => {
      expect(screen.getByText("Restaurants List")).toBeInTheDocument();
    });
  });

  test('displays "Please click on a Restaurant..." message intially', async () => {
    customRender(<RestaurantsList />);

    await waitFor(() => {
      expect(
        screen.getByText("Please click on a Restaurant...")
      ).toBeInTheDocument();
    });
  });

  test("displays restaurants after retrieving data", async () => {
    customRender(<RestaurantsList />);

    await waitFor(() => {
      expect(screen.queryByText("Restaurant 1")).toBeInTheDocument();
      expect(screen.queryByText("Restaurant 2")).toBeInTheDocument();
    });
  });

  test("displays info on selected restaurant details after clicking on a restaurant", async () => {
    customRender(<RestaurantsList />);

    await waitFor(() => {
      userEvent.click(screen.getByText(/Restaurant 1/i));
    });

    expect(screen.getByText(/Japanese/i)).toBeInTheDocument();
    expect(screen.getByText(/\$20 - \$50 \(CAD\)/i)).toBeInTheDocument();
  });
});
