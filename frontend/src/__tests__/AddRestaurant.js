import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddRestaurant from "../components/AddRestaurant";

const nameLabel = /Name/i;
const cuisineTypeLabel = /Cuisine Type/i;
const priceRangeLabel = /Price Range/i;
const submitButtonLabel = /Submit/i;
const restaurantInput = "Restaurant#1";
const cuisineTypeInput = "Japanese";
const priceRangeInput = "$20 to $50 (CAD)";

const mockSpyCreate = jest.fn();

jest.mock("../services/RestaurantDataService", () => ({
    create: (data) => {
        mockSpyCreate();
        return Promise.resolve({
            data: {
                id: 1,
                name: restaurantInput,
                cuisinetype: cuisineTypeInput,
                pricerange: priceRangeInput,
            }
        });
    },
}));

describe("AddRestaurants component", () => {
  const customRender = (children) => {
    render(<BrowserRouter> {children} </BrowserRouter>);
  };

  test("renders without errors", async () => {
    customRender(<AddRestaurant />);

    await waitFor(() => {
      expect(screen.getByLabelText(nameLabel)).toHaveValue("");
      expect(screen.getByLabelText(cuisineTypeLabel)).toHaveValue("");
      expect(screen.getByLabelText(priceRangeLabel)).toHaveValue("");
      expect(screen.getByText(submitButtonLabel)).toBeInTheDocument;
    });
  });

  test("ensure input changes are reflected in state", async () => {
    customRender(<AddRestaurant />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(nameLabel), {
        target: { value: restaurantInput },
      });
      fireEvent.change(screen.getByLabelText(cuisineTypeLabel), {
        target: { value: cuisineTypeInput },
      });
      fireEvent.change(screen.getByLabelText(priceRangeLabel), {
        target: { value: priceRangeInput },
      });
    });

    expect(screen.getByLabelText(nameLabel)).toHaveValue(restaurantInput);
    expect(screen.getByLabelText(cuisineTypeLabel)).toHaveValue(
      cuisineTypeInput
    );
    expect(screen.getByLabelText(priceRangeLabel)).toHaveValue(priceRangeInput);
  });

  test("ensure that `create` restaurant gets called", async () => {
    customRender(<AddRestaurant />);

    await waitFor(() => {
        fireEvent.change(screen.getByLabelText(nameLabel), { target: { value: restaurantInput } });
        fireEvent.change(screen.getByLabelText(cuisineTypeLabel), { target: { value: cuisineTypeInput } });
        fireEvent.change(screen.getByLabelText(priceRangeLabel), { target: { value: priceRangeInput } });

        fireEvent.click(screen.getByText(submitButtonLabel));
        expect(mockSpyCreate).toHaveBeenCalled();
    });
  });
});
