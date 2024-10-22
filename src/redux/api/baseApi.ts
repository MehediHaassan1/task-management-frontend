/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-red-mu-12.vercel.app/api' }),
  tagTypes: ['tasks'],
  endpoints: () => ({}),
})

// https://backend-red-mu-12.vercel.app/api