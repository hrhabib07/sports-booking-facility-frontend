import { baseApi } from "../api/baseApi";

const userBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBooking: builder.query({
      query: () => ({
        url: "/bookings/user",
        method: "GET",
      }),
    }),
    getAvailableBooking: builder.query({
      query: (args) => ({
        url: `/check-availability?date=${args.date}&facility=${args.facility}`,
        method: "GET",
      }),
    }),
    confirmBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
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

export const {
  useGetMyBookingQuery,
  useCancelBookingMutation,
  useGetAvailableBookingQuery,
  useConfirmBookingMutation,
} = userBookingApi;
