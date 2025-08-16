import FloatingChatButton from "@/components/common/FloatingChatWindow";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ScrollToTopButton from "@/components/common/ScollToTopButton";
import { isAuthenticated } from "@/utils/auth.utils";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
        <FloatingChatButton />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default UserLayout;
