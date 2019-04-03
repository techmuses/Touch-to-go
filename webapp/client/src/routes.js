import React from "react";
import { Router } from "@reach/router";
import Splash from "./pages/splash";
import EmpDetail from "./pages/EmpDetail";


const NotFound = () => <div>Sorry, nothing here.</div>;

const Routes = () => {
  return (
    <Router>
      <Splash path="/" />
      <EmpDetail path="detail/:empid/:name"/>

      <NotFound default />
    </Router>
  );
};
export default Routes;
