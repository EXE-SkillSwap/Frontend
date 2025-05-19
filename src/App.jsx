import UserLayout from "@/layouts/UserLayout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

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
