import React, { useState, ChangeEvent, useEffect, FormEvent } from "react"
import { Button } from "../../components/button/style/button"
import { Card } from "../../components/card/style/card"
import { FormInput } from "../../components/form"
import { Base, Option, Selectoption } from "../../components/form/style/form"
import { useGetFxDataQuery } from "../../services/getFx/getFx"
import { BoldText, RegularText } from "../../components/texts/style/text"
import conversionMath from "../../utils/conversionMath"
import getSelectedOption from "../../utils/getSelectedOption"

interface IForm {
  baseAmount: string | undefined
  quoteAmount: string | undefined
  baseCurrency: string | undefined
  quoteCurrency: string | undefined
  baseRate: number | undefined
  quoteRate: number | undefined
}

export const ExchangeScreen: React.FC = () => {
  const { data, error, isLoading } = useGetFxDataQuery()

  const initialQuoteCurrency = data && Object.entries(data?.rates)[0][0]
  const initialBaseCurrency = data && Object.entries(data?.rates)[1][0]
  const initialBaseRate = data?.rates[data?.base]
  const initialQuoteRate = data && Object.entries(data?.rates)[0][1]

  const [form, setForm] = useState<IForm>({
    baseAmount: "",
    quoteAmount: "",
    baseCurrency: undefined,
    quoteCurrency: undefined,
    baseRate: undefined,
    quoteRate: undefined,
  })

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      baseRate: initialBaseRate,
      quoteRate: initialQuoteRate,
      quoteCurrency: initialQuoteCurrency,
      baseCurrency: data?.base,
    }))
  }, [
    initialBaseRate,
    initialBaseCurrency,
    initialQuoteRate,
    initialQuoteCurrency,
    data,
  ])

  const [baseBalance, setBaseBalance] = useState(2000)
  const [quoteBalance, setQuoteBalance] = useState(0)

  const quoteValue = form.quoteRate
  const baseValue = form.baseRate

  /* This handles the onchange function in the base input */

  const handleBaseAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!quoteValue || !baseValue) {
      return
    }

    const val = conversionMath(value, quoteValue, baseValue)
    setForm((prev) => ({
      ...prev,
      baseAmount: value.toString(),
      quoteAmount: val.toString(),
    }))
  }

  const handQuoteAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!quoteValue || !baseValue) {
      return
    }

    const val = conversionMath(value, baseValue, quoteValue)
    setForm((prev) => ({
      ...prev,
      quoteAmount: value.toString(),
      baseAmount: val.toString(),
    }))
  }

  const handleBaseCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    const rate = data?.rates[value]
    setForm((prev) => ({
      ...prev,
      baseCurrency: value,
      baseRate: rate,
    }))
    if (!quoteValue || !baseValue || !form.baseAmount) {
      return
    }

    const val = conversionMath(form.baseAmount, quoteValue, baseValue)

    setForm((prev) => ({
      ...prev,

      quoteAmount: val.toString(),
    }))
  }

  const handleQuoteCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const value = e.target.value
    const currency = getSelectedOption(e)

    setForm((prev) => ({
      ...prev,
      quoteCurrency: currency,
      quoteRate: Number(value),
    }))
    if (!quoteValue || !baseValue || !form.quoteAmount) {
      return
    }

    const val = conversionMath(form.quoteAmount, baseValue, Number(value))

    setForm((prev) => ({
      ...prev,
      baseAmount: val.toString(),
    }))
  }
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setQuoteBalance(quoteBalance + Number(form.quoteAmount))
      setBaseBalance(baseBalance - Number(form.baseAmount))
      setLoading(false)
    }, 3000)
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Card justifyContent={"center"} width={"100%"}>
          <BoldText> RATE:</BoldText>
          <RegularText data-test="exchange-values">
            {`${!isLoading && form.baseRate?.toFixed(2)}
         ${!isLoading && form.baseCurrency} = ${form.quoteRate?.toFixed(2)} ${
              form.quoteCurrency
            }`}
          </RegularText>
          <Base onSubmit={handleSubmit}>
            <div>
              <BoldText
                textAlign={"left"}
              >{`Balance :  ${form.baseCurrency} ${baseBalance}`}</BoldText>
            </div>

            <FormInput
              onChange={handleBaseAmount}
              labelText="Sell"
              htmlFor="baseAmount"
              id="baseAmount"
              value={form.baseAmount}
              type="text"
              placeholder="0.00"
              // dataTest="base-input"
              error={
                baseBalance < Number(form.baseAmount) ? "exceeds balance" : ""
              }
              textAlign={"right"}
              name="baseAmount"
              leftComponent={
                <Selectoption
                  defaultValue={"USD"}
                  name="baseCurrency"
                  data-testid="selectBaseCurrency"
                  onChange={(e) => handleBaseCurrency(e)}
                >
                  {data &&
                    Object.entries(data.rates).map(([key, value]) => {
                      return (
                        <Option
                          data-testid="selectBaseoption"
                          key={key}
                          value={key}
                        >
                          {key}
                        </Option>
                      )
                    })}
                </Selectoption>
              }
            />
            <BoldText>{`Balance :  ${form.quoteCurrency} ${quoteBalance}`}</BoldText>
            <FormInput
              labelText="Buy"
              htmlFor="quoteAmount"
              id="quoteAmount"
              onChange={handQuoteAmount}
              value={form.quoteAmount?.toString()}
              type="number"
              placeholder="0.00"
              textAlign={"right"}
              name="quoteAmount"
              leftComponent={
                <Selectoption
                  name="quoteCurrency"
                  onChange={(e) => handleQuoteCurrency(e)}
                >
                  {data &&
                    Object.entries(data.rates).map(([key, value]) => (
                      <Option key={key} value={key}>
                        {key}
                      </Option>
                    ))}
                </Selectoption>
              }
            />

            <Button type="submit" data-test="button">
              {loading ? "loading..." : "Submit"}
            </Button>
          </Base>
        </Card>
      )}
    </>
  )
}
