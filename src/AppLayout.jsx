import React from "react";
import Navbar from "./components/navbar";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <main className="p-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
