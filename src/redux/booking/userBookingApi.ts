import { baseApi } from "../api/baseApi";

const userBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBooking: builder.query({
      query: () => ({
        url: "/bookings/user",
        method: "GET",
      }),
    }),
    cancelBooking: builder.mutation({
      query: (bookingId: string) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetMyBookingQuery, useCancelBookingMutation } =
  userBookingApi;
