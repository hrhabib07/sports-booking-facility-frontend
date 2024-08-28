import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    userSignUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    adminSignUp: builder.mutation({
      query: (adminInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: adminInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUserSignUpMutation,
  useAdminSignUpMutation,
} = authApi;
