import { createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  Login,
  User,
  Dashboard,
  CreateUser,
  UpdateUser,
  Course,
  Reference,
  Home,
  Register,
  ListReferences,
  Bookmark,
  CreateCourse,
  UpdateCourse,
  CreateReference,
  UpdateReference,
  ReferenceDetail,
} from "../pages";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";
import HomeLayout from "../layouts/HomeLayout";

// Create the router
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/auth",
          children: [
            {
              index: true,
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
        {
          path: "/users",
          element: <User />,
        },
        {
          path: "/courses",
          element: <Course />,
        },
        {
          path: "/references",
          element: <ListReferences />,
        },
        {
          path: "/references/summary/:id",
          element: <ReferenceDetail />,
        },
        {
          path: "/bookmarks",
          element: <Bookmark />,
        },
        {
          path: "dashboard",
          element: <ProtectedRoute children={<DashboardLayout />} />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "references",
              children: [
                {
                  index: true,
                  element: <Reference />,
                },
                {
                  path: "create",
                  element: <CreateReference />,
                },
                {
                  path: "update/:id",
                  element: <UpdateReference />,
                },
              ],
            },
            {
              path: "courses",
              children: [
                {
                  index: true,
                  element: <Course />,
                },
                {
                  path: "create",
                  element: <CreateCourse />,
                },
                {
                  path: "update/:id",
                  element: <UpdateCourse />,
                },
              ],
            },
            {
              path: "users",
              children: [
                {
                  index: true,
                  element: <User />,
                },
                {
                  path: "create",
                  element: <CreateUser />,
                },
                {
                  path: "update/:id",
                  element: <UpdateUser />,
                },
              ],
            },
            {
              path: "setting",
              children: [
                {
                  index: true,
                  element: <User />,
                },
                {
                  path: "create",
                  element: <CreateUser />,
                },
                {
                  path: ":id",
                  element: <UpdateUser />,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
