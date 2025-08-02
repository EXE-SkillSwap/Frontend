import ManageMemberships from "@/Admin/dashboard/ManageMembership";
import Participants from "@/Admin/dashboard/Participants";
import AppLoading from "@/components/common/loading/AppLoading";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import UserLayout from "@/layouts/UserLayout";
import AddSkill from "@/pages/AddSkill";
import Admin from "@/pages/AdminPage";
import CommingSoon from "@/pages/CommingSoon";
import EditSkill from "@/pages/EditSkill";
import NotFound from "@/pages/errors/NotFound";
import FindFriends from "@/pages/FindFriends";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Membership from "@/pages/Membership";
import Payment from "@/pages/Payment";
import Profile from "@/pages/Profile";
import SelectSkills from "@/pages/SelectSkills";
import Signup from "@/pages/Signup";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import EnhancedChatInterface from "./pages/EnhancedChatInterface";
import ForumPage from "./pages/ForumPage";
import GoogleCallback from "@/pages/GoogleCallback";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }
  const routes = createBrowserRouter([
    {
      path: "/skills",
      element: <SelectSkills />,
    },
    {
      path: "/payment/callback",
      element: <Payment />,
    },
    {
      path: "/chats",
      element: <EnhancedChatInterface />,
    },
    {
      path: "/auth",
      element: <GoogleCallback />,
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
          path: "/add-skill",
          element: <AddSkill />,
        },
        {
          path: "/edit-skill/:skillId",
          element: <EditSkill />,
        },
        {
          path: "/documents",
          element: <CommingSoon />,
        },
        {
          path: "/friends",
          element: <FindFriends />,
        },

        {
          path: "/posts",
          element: <CommingSoon />,
        },
        {
          path: "/membership",
          element: <Membership />,
        },
        {
          path: "/forum",
          element: <ForumPage />,
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
          path: "memberships",
          element: <ManageMemberships />,
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
