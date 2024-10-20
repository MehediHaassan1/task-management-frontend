import { baseApi } from "../../api/baseApi";

const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createTask: builder.mutation({
      query: (payload) => {
        return {
          url: '/tasks',
          method: 'POST',
          body: payload
        }
      },
      invalidatesTags: ['tasks'],
    }),

    getTasks: builder.query({
      query: ({ carType, price }) => {
        const params = new URLSearchParams();

        if (carType) {
          params.append('carType', carType);
        }
        if (price > 0) {
          params.append('price', price);
        }
        return {
          url: '/cars',
          method: 'GET',
          params,
        }
      },
      providesTags: ['tasks'],
    }),

    updateTask: builder.mutation({
      query: (payload) => {
        return {
          url: `/tasks/${payload.id}`,
          method: 'PUT',
          body: payload.data,
        }
      },
      invalidatesTags: ['tasks'],
    }),

    deleteTask: builder.mutation({
      query: (payload) => {
        return {
          url: `/tasks/${payload.id}`,
          method: "PUT",
          body: { isDeleted: payload.status },
        }
      },
      invalidatesTags: ['tasks'],
    }),

  }),
})

export const {
useCreateTaskMutation,
useGetTasksQuery,
useUpdateTaskMutation,
useDeleteTaskMutation,
} = tasksApi;