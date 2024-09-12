import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://invoice-server.icchaporon.com/api/v1",
    // baseUrl: "http://localhost:4000/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["invoice"],
});

export default baseApi;
