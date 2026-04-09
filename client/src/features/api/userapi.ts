import { apiSlice } from "./ApiSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
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

    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    register: builder.mutation({
      query: (credentials: RegisterCredentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userapi;
