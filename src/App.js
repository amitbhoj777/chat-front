import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import MainComponent from "./mainComponent.js";
import Auth from "./auth.jsx";
import Signup from "./users/signup.js";
import Login from "./users/login.js";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  const [apiResponse, setState] = useState(0);
  let params = {};
  params.name = "Anurag";
  params.username = "Anurag";
  params.password = "Anurag!@#";
  params.mobile = 9876543212;
  params.id = 2;
  params.email = "Anurag@123.com";

  function callAPI() {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',                  
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((res) => setState(res));
  }
  function callAPI2() {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/users',
      params: params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',                  
      }
    }).then((res) => setState(res));
  }

  useEffect(() => {
    // callAPI();
    // callAPI2();
  }, []);
  console.log(apiResponse, " apiResponseapiResponseapiResponseapiResponse");
  return (
    <Router>
      <div className="">
        <Auth>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
          </Switch>
        </Auth>
        {sessionStorage.getItem('login') && <MainComponent />}
      </div>
    </Router>
  );
}

export default App;
