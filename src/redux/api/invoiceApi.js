import baseApi from "./baseApi";

const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createinvoice: builder.mutation({
      query: (data) => ({
        url: "/invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invoice"],
    }),

    getAllInvoice: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/invoice",
          method: "GET",
          params,
        };
      },
      providesTags: ["invoice"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleInvoice: builder.query({
      query: (id) => ({
        url: `/invoice/${id}`,
        method: "GET",
      }),
      providesTags: ["invoice"],
    }),

    updateInvoice: builder.mutation({
      query: (data) => {
        return {
          url: `/invoice/${data.id}`,
          method: "PATCH",
          body: data.body,
        };
      },
      invalidatesTags: ["invoice"],
    }),
    createInvoiceWithXLSX: builder.mutation({
      query: (data) => {
        return {
          url: "/invoice/xl",
          method: "POST",
          body: data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: ["invoice"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/invoice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoice"],
    }),
  }),
});

export const {
  useCreateinvoiceMutation,
  useGetAllInvoiceQuery,
  useGetSingleInvoiceQuery,
  useCreateInvoiceWithXLSXMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
