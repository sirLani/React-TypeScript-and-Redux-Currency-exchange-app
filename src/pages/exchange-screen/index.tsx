import React, { useState } from 'react';
import { Button } from '../../components/button/style/button';
import { Card } from '../../components/card/style/card';
import { Form, FormInput } from '../../components/form';
import { Option, Selectoption } from '../../components/form/style/form';
import { useGetFxDataQuery } from '../../services/getFx/getFx';
import { BoldText, RegularText } from '../../components/texts/style/text';
import { RateType } from '../../services/interface';

export const ExchangeScreen: React.FC = () => {
   const { data, error, isLoading } = useGetFxDataQuery();
   console.log(data && Object.entries(data?.rates));

   const [ratess, setRates] = useState<RateType>();

   const [form, setForm] = useState({
      inputOne: '',
      inputTwo: '',
      currencyOne: 'USD',
      currencyTwo: 'CAD',
   });

   const rates = [
      { AED: 3.6731 },
      { AFN: 105.272924 },
      { ALL: 107.718821 },
      { AMD: 481.684578 },
      { ANG: 1.805924 },
      { AOA: 532.931 },
   ];

   const initialBaseCurrency = Object.keys(rates[0])[0];
   const initialQuoteCurrency = Object.keys(rates[1])[0];

   const [baseAmount, setBaseAmount] = useState('');
   const [quoteAmount, setQuoteAmount] = useState('');
   const [baseCurrency, setBaseCurrency] = useState(data?.base);
   const [quoteCurrency, setQuoteCurrency] = useState(initialQuoteCurrency);

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
      let val = e.target.value;

      if (e.target.name === 'inputOne') {
         //  handleAmountConversion1(val);
      }
   };

   const handleAmountConversion1 = (amount: number) => {
      // let val = (amount * rates[currency2]) / parseInt(amount1);
      // setAmount2(val.toString());
      // setAmount1(amount.toString());
   };
   return (
      <>
         <Card justifyContent={'center'} width={'100%'}>
            <BoldText> SELL:</BoldText>
            <RegularText>{`1 ${baseCurrency} = ${quoteCurrency}`}</RegularText>
            <Form>
               <FormInput
                  onChange={(e) => handleAmountConversion1(e.target.value)}
                  value={baseAmount}
                  type="number"
                  placeholder="0.00"
                  // error={"This is just wrong"}
                  textAlign={'right'}
                  name="inputOne"
                  leftComponent={
                     <Selectoption
                        name="currencyOne"
                        onChange={(e) => {
                           setBaseAmount(e.target.value);
                        }}
                        value={form.currencyOne}
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
                  onChange={(e) => {
                     setQuoteAmount(e.target.value);
                  }}
                  value={baseAmount}
                  type="number"
                  placeholder="0.00"
                  // error={"This is just wrong"}
                  textAlign={'right'}
                  name="inputTwo"
                  leftComponent={
                     <Selectoption
                        name="currencyTwo"
                        onChange={(e) => setQuoteCurrency(e.target.value)}
                        value={quoteCurrency}
                     >
                        {rates.map((rate, i) => (
                           <Option key={i} value={Object.keys(rates)}>
                              {Object.keys(rate)}
                           </Option>
                        ))}
                     </Selectoption>
                  }
               />

               <Button>Submit</Button>
            </Form>
         </Card>
      </>
   );
};
