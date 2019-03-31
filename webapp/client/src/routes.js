import React from "react";
import { Router } from "@reach/router";
import Splash from "./pages/splash";

const NotFound = () => <div>Sorry, nothing here.</div>;

const Routes = () => {
  return (
    <Router>
      <Splash path="/" />
      <NotFound default />
    </Router>
  );
};
export default Routes;
