import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { EmployeeViews } from "./views/EmployeeViews";
import { EmployeeNavBar } from "./components/nav/EmployeeNavBar";
import "./VinylCut.css";
import { isStaff } from "./utils/isStaff";
import { EmployeeRegister } from "./components/auth/EmployeeRegister";

export const VinylCut = () => {

  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("vinylcut")) {
            if (isStaff()) {
              return <>
                  <EmployeeNavBar />
                  <EmployeeViews />
                </>
            }
            else {
              return <>
                  <NavBar />
                  <ApplicationViews />
                </>
            }
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/registeremployee">
        <EmployeeRegister />
      </Route>
    </>
  )
}