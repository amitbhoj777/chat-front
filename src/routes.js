import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ContactPage from "./contact/index.jsx";
import EditUser from "./contact/editUserDetails.jsx";
import Chat from "./chat/index.jsx";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/chat" component={Chat}></Route>
      <Route exact path="/contacts" component={ContactPage}></Route>
      <Route exact path="/editUser" component={EditUser}></Route>
    </Switch>
  );
};
export default Routes;
