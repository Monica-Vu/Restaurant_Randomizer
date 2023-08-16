import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Restaurants from "../components/Restaurant";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const mockSpyDelete = jest.fn();

jest.mock("../services/RestaurantService", () => ({
  get: (num) =>
    Promise.resolve({
      data: {
        id: num,
        name: "Restaurant 1",
        cuisinetype: "Japanese",
        pricerange: "$20 - $50 (CAD)",
      },
    }),
  update: (num, data) =>
    Promise.resolve({
      data: {
        message: "Restaurant was successfully updated.",
      },
    }),
  // this just tests to make sure we are calling `deleteRestaurant`
  delete: (num) => {
    mockSpyDelete();
    return Promise.resolve({
      data: {
        message: "Restaurant was deleted successfully!",
      },
    });
  },
}));

describe("Restaurants component", () => {
  const num = 1;

  const customRender = (children) => {
    render(<BrowserRouter> {children} </BrowserRouter>);
  };

  test("renders correctly without errors", async () => {
    customRender(<Restaurants id={num} />);

    await waitFor(() => {
      expect(screen.getByText("Restaurant")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Cuisine Type")).toBeInTheDocument();
      expect(screen.getByText("Price Range")).toBeInTheDocument();
    });
  });

  test("displays info of current restaurant correctly", async () => {
    customRender(<Restaurants id={num} />);

    await waitFor(() => {
      expect(screen.getByTestId("restaurant-name")).toBeInTheDocument();
      expect(screen.getByTestId("cuisine-type")).toBeInTheDocument();
      expect(screen.getByTestId("restaurant-price-range")).toBeInTheDocument();
    });
  });

  test("update restaurant successfully", async () => {
    const successMsg = "This restaurant was updated successfully!";

    customRender(<Restaurants id={num} />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Update"));
      expect(screen.getByText(successMsg)).toBeInTheDocument();
    });
  });

  test("delete restaurant successfully", async () => {
    customRender(<Restaurants id={num} />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Delete"));
      expect(mockSpyDelete).toHaveBeenCalled();
    });
  });
});
