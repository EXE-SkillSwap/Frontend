import UserLayout from "@/layouts/UserLayout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Signup from "@/pages/Signup";
import Admin from "@/pages/AdminPage";
import Participants from "@/Admin/dashboard/Participants";
import UploadDocument from "@/Admin/dashboard/Document";

function App() {
  const routes = createBrowserRouter([
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
        {
          path: "/admin/dashboard",
          element: <Admin />,
        },
        {
          path: "/admin/participants",
          element: <Participants />,
        },
        {
          path: "/admin/upload-document",
          element: <UploadDocument />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
