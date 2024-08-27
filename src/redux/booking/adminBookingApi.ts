import { baseApi } from "../api/baseApi";

const adminBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      //   providesTags: ["my-booking"],
    }),
    // getAvailableBooking: builder.query({
    //   query: (args) => ({
    //     url: `/check-availability?date=${args.date}&facility=${args.facility}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["confirmed-booking"],
    // }),
    // confirmBooking: builder.mutation({
    //   query: (data) => ({
    //     url: "/bookings",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["confirmed-booking"],
    // }),
    // cancelBooking: builder.mutation({
    //   query: (bookingId: string) => ({
    //     url: `/bookings/${bookingId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["my-booking", "confirmed-booking"],
    // }),
  }),
});

export const { useGetAllBookingsQuery } = adminBookingApi;
