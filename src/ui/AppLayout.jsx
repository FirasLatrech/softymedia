import React from "react";
import Headers from "./Headers";
import { Outlet, useLocation, useParams } from "react-router-dom";
import "./_AppLayout.scss";
import Login from "../pages/Login/Login";
import CreateProfile from "../services/apiCreateProfile";
export default function AppLayout() {
  const path = useLocation();

  // ;
  return (
    <>
      {path.pathname.includes("/user") ? (
        <div className="AppLayout">
          <span className="header">
            <Headers></Headers>
          </span>
          <main className="main">
            <Outlet />
          </main>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
