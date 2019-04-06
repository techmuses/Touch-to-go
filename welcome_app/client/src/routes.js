import React from "react";
import { Router } from "@reach/router";

import Welcome from "./Pages/Welcome";
import ThankU from "./Pages/ThankU";


const NotFound = () => <div>Sorry, nothing here.</div>;

const Routes = () => {
  return (
    <Router>
      <Welcome path="/" />
      <ThankU path="/thanku"/>
      <NotFound default />
    </Router>
  );
};
export default Routes;
