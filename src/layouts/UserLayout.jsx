import Header from "@/components/common/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserLayout;
``;
