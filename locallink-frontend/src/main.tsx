import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import JobsPage from "./pages/JobsPage.tsx";
import JobDetailsPage from "./pages/JobDetailsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import VerifyPage from "./pages/VerifyPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.tsx";
import SubmissionsPage from "./pages/SubmissionsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "jobs/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
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
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin/submissions",
    element: <SubmissionsPage />,
  },
  {
    path: "/admin/users",
    element: <UsersPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
