import UserLayout from "@/layouts/UserLayout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Signup from "@/pages/Signup";
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
