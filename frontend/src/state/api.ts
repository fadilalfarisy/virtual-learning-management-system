import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_HOST_API,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      const newToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      api.dispatch({ type: "auth/setAccessToken", payload: newToken });

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/deleteAuth" });
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Users", "Courses", "References", "Bookmarks", "Dashboard"],
  endpoints: (builder) => {
    return {
      // Auth
      login: builder.mutation({
        query: (post) => ({
          url: "/auth/login",
          method: "POST",
          body: post,
        }),
      }),
      register: builder.mutation({
        query: (post) => ({
          url: "/auth/register",
          method: "POST",
          body: post,
        }),
      }),
      logout: builder.query({
        query: () => "/auth/logout",
      }),

      getDashboardInfo: builder.query({
        query: () => "/info/dashboard",
      }),

      // Courses
      getAllCourses: builder.query({
        query: ({ semester, search, sort, skip, limit }) => {
          const params = new URLSearchParams();

          if (semester) params.append("semester", semester);
          if (search) params.append("search", search);
          if (sort) params.append("sort", sort);
          if (skip) params.append("skip", skip);
          if (limit) params.append("limit", limit);

          return `/courses?${params.toString()}`;
        },
        providesTags: ["Courses"],
      }),
      getCourseById: builder.query({
        query: (id) => `/courses/${id}`,
        providesTags: ["Courses"],
      }),
      createCourse: builder.mutation({
        query: (body) => ({
          url: `/courses`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Courses", "Dashboard"],
      }),
      updateCourse: builder.mutation({
        query: ({ id, body }) => ({
          url: `/courses/${id}`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Courses"],
      }),
      deleteCourse: builder.mutation({
        query: (id) => ({
          url: `/courses/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Courses", "Dashboard"],
      }),

      // References
      getAllReferences: builder.query({
        query: ({ search, sort, courseId, skip, limit }) => {
          const params = new URLSearchParams();

          if (search) params.append("search", search);
          if (sort) params.append("sort", sort);
          if (courseId) params.append("courseId", courseId);
          if (skip) params.append("skip", skip);
          if (limit) params.append("limit", limit);

          return `/references?${params.toString()}`;
        },
        providesTags: ["References"],
      }),
      getAllReferencesCreatedBy: builder.query({
        query: ({ search, sort, courseId, skip, limit }) => {
          const params = new URLSearchParams();

          if (search) params.append("search", search);
          if (sort) params.append("sort", sort);
          if (courseId) params.append("courseId", courseId);
          if (skip) params.append("skip", skip);
          if (limit) params.append("limit", limit);

          return `/references/me?${params.toString()}`;
        },
        providesTags: ["References"],
      }),
      getReferenceById: builder.query({
        query: (id) => `/references/${id}`,
        providesTags: ["References"],
      }),
      createReference: builder.mutation({
        query: (body) => ({
          url: `/references`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["References", "Dashboard"],
      }),
      updateReference: builder.mutation({
        query: ({ id, body }) => ({
          url: `/references/${id}`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["References"],
      }),
      deleteReference: builder.mutation({
        query: (id) => ({
          url: `/references/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["References", "Dashboard"],
      }),
      generateSummary: builder.mutation({
        query: (body) => ({
          url: `/references/summarize`,
          method: "POST",
          body: body,
        }),
      }),

      // Bookmarks
      getBookmark: builder.query({
        query: () => `/bookmarks`,
        providesTags: ["Bookmarks"],
      }),
      addBookmark: builder.mutation({
        query: (body) => ({
          url: `/bookmarks`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Bookmarks"],
      }),
      removeBookmark: builder.mutation({
        query: (body) => ({
          url: `/bookmarks`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Bookmarks"],
      }),

      // Users
      getAllUsers: builder.query({
        query: () => `/users`,
        providesTags: ["Users"],
      }),
      getUserById: builder.query({
        query: (id) => `/users/${id}`,
        providesTags: ["Users"],
      }),
      createUser: builder.mutation({
        query: (body) => ({
          url: `/users`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Users", "Dashboard"],
      }),
      updateUser: builder.mutation({
        query: ({ id, body }) => ({
          url: `/users/${id}`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["Users"],
      }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Users", "Dashboard"],
      }),
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,

  useGetDashboardInfoQuery,

  useGetAllCoursesQuery,
  useLazyGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,

  useGetAllReferencesQuery,
  useLazyGetAllReferencesQuery,
  useGetAllReferencesCreatedByQuery,
  useLazyGetAllReferencesCreatedByQuery,
  useGetReferenceByIdQuery,
  useCreateReferenceMutation,
  useUpdateReferenceMutation,
  useDeleteReferenceMutation,

  useGenerateSummaryMutation,

  useGetBookmarkQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,

  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;
