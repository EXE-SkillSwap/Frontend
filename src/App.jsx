import ManageCourses from "@/Admin/dashboard/ManageCourses";
import ManageMemberships from "@/Admin/dashboard/ManageMembership";
import ManageSubscription from "@/Admin/dashboard/ManageSubscription";
import Participants from "@/Admin/dashboard/Participants";
import AppLoading from "@/components/common/loading/AppLoading";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import UserLayout from "@/layouts/UserLayout";
import AddSkill from "@/pages/AddSkill";
import Admin from "@/pages/AdminPage";
import AttendedCourses from "@/pages/AttendedCourses";
import CommingSoon from "@/pages/CommingSoon";
import CourseDetail from "@/pages/CourseDetail";
import CoursePage from "@/pages/CoursePage";
import EditSkill from "@/pages/EditSkill";
import NotFound from "@/pages/errors/NotFound";
import FindFriends from "@/pages/FindFriends";
import GoogleCallback from "@/pages/GoogleCallback";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Membership from "@/pages/Membership";
import MyCourses from "@/pages/MyCourses";
import Payment from "@/pages/Payment";
import Profile from "@/pages/Profile";
import SelectSkills from "@/pages/SelectSkills";
import Signup from "@/pages/Signup";
import { useEffect, useState } from "react";
import { RouterProvider, useParams } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import EnhancedChatInterface from "./pages/EnhancedChatInterface";
import ForumPage from "./pages/ForumPage";
import CourseAttendees from "@/pages/CourseAttendees";
import PostDetail from "@/pages/PostDetail";
import UserPostProfile from "@/pages/UserPostProfile";
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
      path: "/chats",
      element: <EnhancedChatInterface />,
    },
    {
      path: "/payment/callback",
      element: <Payment />,
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
        {
          path: "/my-courses",
          element: <MyCourses />,
        },
        {
          path: "/attended-courses",
          element: <AttendedCourses />,
        },
        {
          path: "/courses",
          element: <CoursePage />,
        },
        {
          path: "/course/:courseId",
          element: <CourseDetail />,
        },
        {
          path: "/attendees/:courseId",
          element: <CourseAttendees />,
        },
        {
          path: "/posts/:postId",
          element: <PostDetail />,
        },
        {
          path: "/p/:nickname",
          element: <UserPostProfile />,
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
        {
          path: "courses",
          element: <ManageCourses />,
        },
        {
          path: "subscriptions",
          element: <ManageSubscription />,
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
