// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const brainStormApi = createApi({
  reducerPath: "brainStormApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REQ_URL }),
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "api/quiz/new",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateQuizMutation } = brainStormApi;