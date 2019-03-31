import React from "react";
import { Router } from "@reach/router";
import Splash from "./pages/splash";
import Login from "./pages/accounts/login";

const NotFound = () => <div>Sorry, nothing here.</div>;

const Routes = () => {
  return (
    <Router>
      <Splash path="/" />
      <Login path="login" />
      <NotFound default />
    </Router>
  );
};
export default Routes;
