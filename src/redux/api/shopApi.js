import baseApi from "./baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (data) => ({
        url: "/shop",
        method: "POST",
        body: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["shop"],
    }),

    getAllShop: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/shop",
          method: "GET",
          params,
        };
      },
      providesTags: ["shop"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleShop: builder.query({
      query: (id) => ({
        url: `/shop/${id}`,
        method: "GET",
      }),
      providesTags: ["shop"],
    }),

    updateShop: builder.mutation({
      query: (data) => {
        return {
          url: `/shop/${data.id}`,
          method: "PATCH",
          body: data.body,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: ["shop"],
    }),

    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shop/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["shop"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetAllShopQuery,
  useGetSingleShopQuery,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = shopApi;
