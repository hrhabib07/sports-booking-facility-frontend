import { baseApi } from "../api/baseApi";

const facilitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: () => ({
        url: "/facility",
        method: "GET",
        // body: userInfo,
      }),
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

export const { useGetAllFacilitiesQuery, useGetSingleFacilityQuery } =
  facilitiesApi;
