import React from "react";

import { UseAuth } from "../hooks/auth";
import App from "./app.routes";
import Auth from "./auth.routes";
import { BrowserRouter } from "react-router-dom";

const Routes: React.FC = () => {
  const { logged } = UseAuth();
  return <BrowserRouter>{logged ? <App /> : <Auth />}</BrowserRouter>;
};

export default Routes;
