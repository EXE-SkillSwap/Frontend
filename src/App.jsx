import UserLayout from "@/layouts/UserLayout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Signup from "@/pages/Signup";
import Dashboard from './Admin/dashboard/index.jsx';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The App component sets up the routing for the application using `createBrowserRouter`.
 * It defines several routes with their respective components or elements, including:
 * - "/" which renders the UserLayout component with nested routes.
 * - "/login" to render the Login component.
 * - "/register" to render the Signup component.
 * - "/documents", "/friends", "/groups", and "/membership" which render heading elements.
 * - "/admin/dashboard" to render the Dashboard component.
 * The routes are provided to the RouterProvider to enable navigation within the application.
 */

/*******  f18e61ed-cd31-4149-98a7-25db010262bd  *******/
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
          element: <Dashboard />,
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
