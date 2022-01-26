import React, { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { Button } from '../../components/button/style/button'

import { Card } from '../../components/card/style/card'
import { Form, FormInput } from '../../components/form'
import { Option, Selectoption } from '../../components/form/style/form'
import { useGetFxDataQuery } from '../../services/getFx/getFx'
import { BoldText, RegularText } from '../../components/texts/style/text'
import conversionMath from '../../utils/conversionMath'
import getSelectedOption from '../../utils/getSelectedOption'

export const ExchangeScreen: React.FC = () => {
  const { data, error, isLoading } = useGetFxDataQuery()

  const initialQuoteCurrency = data && Object.entries(data?.rates)[1][0]
  const initialBaseCurrency = data && Object.entries(data?.rates)[0][0]
  const initialBaseRate = data && Object.entries(data?.rates)[0][1]
  const initialQuoteRate = data && Object.entries(data?.rates)[1][1]

  const [form, setForm] = useState({
    baseAmount: '',
    quoteAmount: '',
    baseCurrency: initialBaseCurrency,
    quoteCurrency: initialQuoteCurrency,
    baseRate: initialBaseRate,
    quoteRate: initialQuoteRate,
  })

  const setInitialbaseValue = useCallback(() => {
    setForm((prev) => ({ ...prev, baseRate: initialBaseRate }))
    setForm((prev) => ({ ...prev, quoteRate: initialQuoteRate }))
    setForm((prev) => ({
      ...prev,
      quoteCurrency: initialQuoteCurrency,
      baseCurrency: initialBaseCurrency,
    }))
  }, [initialBaseRate, initialQuoteRate])

  useEffect(() => {
    setInitialbaseValue()
  }, [initialBaseRate])

  const quoteValue = form.quoteRate
  const baseValue = form.baseRate

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

    const currency = getSelectedOption(e)

    if (!quoteValue || !baseValue) {
      return
    }

    const val = conversionMath(value, quoteValue, baseValue)
    setForm((prev) => ({
      ...prev,
      baseCurrency: currency,
      quoteAmount: val.toString(),
    }))
  }

  const handleQuoteCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const currency = getSelectedOption(e)
    if (!quoteValue || !baseValue) {
      return
    }

    const val = conversionMath(value, baseValue, quoteValue)
    setForm((prev) => ({
      ...prev,
      quoteCurrency: currency,
      baseAmount: val.toString(),
    }))
  }

  return (
    <>
      <Card justifyContent={'center'} width={'100%'}>
        <BoldText> SELL:</BoldText>
        <RegularText>{`${!isLoading && form.baseRate?.toFixed(2)} ${
          !isLoading && form.baseCurrency
        } = ${form.quoteRate?.toFixed(2)} ${form.quoteCurrency}`}</RegularText>
        <Form>
          <FormInput
            onChange={handleBaseAmount}
            value={form.baseAmount}
            type="number"
            placeholder="0.00"
            // error={"This is just wrong"}
            textAlign={'right'}
            name="baseAmount"
            leftComponent={
              <Selectoption
                name="baseCurrency"
                onChange={(e) => handleBaseCurrency(e)}
                value={form.baseCurrency}
              >
                {data &&
                  Object.entries(data.rates).map(([key, value]) => (
                    <Option key={key} value={value}>
                      {key}
                    </Option>
                  ))}
              </Selectoption>
            }
          />
          <FormInput
            onChange={handQuoteAmount}
            value={form.quoteAmount.toString()}
            type="number"
            placeholder="0.00"
            // error={"This is just wrong"}
            textAlign={'right'}
            name="quoteAmount"
            leftComponent={
              <Selectoption
                name="quoteCurrency"
                onChange={(e) => handleQuoteCurrency(e)}
                value={form.quoteCurrency}
              >
                {data &&
                  Object.entries(data.rates).map(([key, value]) => (
                    <Option key={key} value={value}>
                      {key}
                    </Option>
                  ))}
              </Selectoption>
            }
          />

          <Button>Submit</Button>
        </Form>
      </Card>
    </>
  )
}
