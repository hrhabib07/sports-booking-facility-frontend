import { baseApi } from "../api/baseApi";

const facilitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: () => ({
        url: "/facility",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["facility"],
    }),
    createFacility: builder.mutation({
      query: (facilityInfo) => ({
        url: "/facility",
        method: "POST",
        body: facilityInfo,
      }),
      invalidatesTags: ["facility"],
    }),
    updateFacility: builder.mutation({
      query: (args) => ({
        url: `/facility/${args.facilityId}`,
        method: "PUT",
        body: args.facilityData,
      }),
      invalidatesTags: ["facility"],
    }),
    deleteFacility: builder.mutation({
      query: (facilityId) => ({
        url: `/facility/${facilityId}`,
        method: "DELETE",
        // body: facilityInfo,
      }),
      invalidatesTags: ["facility"],
    }),
    getSingleFacility: builder.query({
      query: (facilityId) => ({
        url: `/facility/${facilityId}`,
        method: "GET",
        // body: userInfo,
      }),
    }),
    // userSignUp: builder.mutation({
    //   query: (userInfo) => ({
    //     url: "/auth/signup",
    //     method: "POST",
    //     body: userInfo,
    //   }),
    // }),
  }),
});

export const {
  useGetAllFacilitiesQuery,
  useGetSingleFacilityQuery,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = facilitiesApi;
