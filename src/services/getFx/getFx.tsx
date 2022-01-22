import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FxData } from "../interface";

export const getFxApi = createApi({
   reducerPath: "getFx",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://openexchangerates.org/api/",
   }),
   endpoints: (builder) => ({
      getFxData: builder.query<FxData, void>({
         query: () => "latest.json?app_id=3e734355952d4104a3ffa61f259ec05e",
      }),
   }),
});

export const { useGetFxDataQuery } = getFxApi;
