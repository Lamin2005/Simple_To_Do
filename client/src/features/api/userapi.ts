import { apiSlice } from "./ApiSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

export const userapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUserInfo: builder.query({
    //   query: (id) => `users/${id}`,
    // }),

    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation } = userapi;
