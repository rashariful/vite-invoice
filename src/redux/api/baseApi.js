import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://invapi.icchaporon.com/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["invoice"],
});

export default baseApi;
