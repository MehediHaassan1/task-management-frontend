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
      query: ({ search = '', status = 'All', priority = 'All', tag = 'All' }) => {
        const params = new URLSearchParams();

        if (search) params.append('search', search);

        if (status !== 'All') params.append('status', status);

        if (priority !== 'All') params.append('priority', priority);

        if (tag !== 'All') params.append('tag', tag);

        return {
          url: '/tasks',
          method: 'GET',
          params,
        };
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
      query: (id) => {
        return {
          url: `/tasks/${id}`,
          method: "DELETE",
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