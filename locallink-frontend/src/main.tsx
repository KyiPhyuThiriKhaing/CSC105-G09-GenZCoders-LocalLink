import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import JobsPage from "./pages/JobsPage.tsx";
import JobDetailsPage from "./pages/JobDetailsPage.tsx";
import PublicProfilePage from "./pages/PublicProfilePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import VerifyPage from "./pages/VerifyPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.tsx";
import SubmissionsPage from "./pages/SubmissionsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import MyProfilePage from "./pages/MyProfilePage.tsx";
import PostJobPage from "./pages/PostJobPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import SuspendedPage from "./pages/SuspendedPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "suspended",
        element: <SuspendedPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "verify",
        element: <VerifyPage />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "jobs/post",
        element: <PostJobPage />,
      },
      {
        path: "jobs/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <MyProfilePage />,
          },
          {
            path: "my-profile",
            element: <MyProfilePage />,
          },
          {
            path: "verify",
            element: <VerifyPage />,
          },
          {
            path: "history",
            element: <HistoryPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "chat",
            element: <ChatPage />,
          },
        ],
      },
      {
        path: "users/:id",
        element: <PublicProfilePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/submissions",
    element: <SubmissionsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/users",
    element: <UsersPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" richColors visibleToasts={1} />
    <RouterProvider router={router} />
  </StrictMode>,
);
