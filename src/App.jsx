import UploadDocument from "@/Admin/dashboard/Document";
import Participants from "@/Admin/dashboard/Participants";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import UserLayout from "@/layouts/UserLayout";
import Admin from "@/pages/AdminPage";
import NotFound from "@/pages/errors/NotFound";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import SelectSkills from "@/pages/SelectSkills";
import Signup from "@/pages/Signup";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/skills",
      element: <SelectSkills />,
    },
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Signup />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/documents",
          element: <h1>Documents</h1>,
        },
        {
          path: "/friends",
          element: <h1>Friends</h1>,
        },
        {
          path: "/groups",
          element: <h1>Groups</h1>,
        },
        {
          path: "/membership",
          element: <h1>Membership</h1>,
        },
      ],
    },
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <Admin />,
        },
        {
          path: "participants",
          element: <Participants />,
        },
        {
          path: "upload-document",
          element: <UploadDocument />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
