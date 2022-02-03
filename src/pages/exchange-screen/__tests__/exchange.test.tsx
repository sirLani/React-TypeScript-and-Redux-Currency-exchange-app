import React from "react"
import { Provider } from "react-redux"
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { store } from "../../../store/getFx/getFx"
import { ExchangeScreen } from "../"

// jest.useFakeTimers()

const renderExchangeScreen = () => {
  return render(
    <Provider store={store}>
      <ExchangeScreen />
    </Provider>
  )
}

it("displays loading state", async function () {
  renderExchangeScreen()

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

  await waitForElementToBeRemoved(screen.getByText(/Loading.../i))

  expect(screen.getByText(/RATE:/i)).toBeInTheDocument()
})

it("displays AFN whn the slect option for AFN is selected", async () => {
  renderExchangeScreen()

  fireEvent.change(screen.getByTestId("selectBaseCurrency"), {
    target: { value: "AFN" },
  })

  expect(screen.getAllByText("AFN") as HTMLElement[])
})

it("converts from AED to AFN correctly", async () => {
  renderExchangeScreen()

  const baseInput = await screen.getByLabelText("Sell")
  fireEvent.change(baseInput, { target: { value: 300 } })

  const quoteInput = screen.findByLabelText("Buy")
  expect((await quoteInput).textContent).toEqual("")
})

it("displays error message", async () => {
  renderExchangeScreen()

  const baseInput = screen.getByLabelText("Sell")
  userEvent.type(baseInput, "200")
})
