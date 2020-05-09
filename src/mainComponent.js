import React, { useEffect, useState } from "react";
import Routes from "./routes.js";
import "./chat/chat.scss";
import NavBar from "./chat/navBar.jsx";

const MainComponent = (props) => {
  return (
        <div class="mainContainer">
            <NavBar
                userData = {JSON.parse(sessionStorage.getItem('login')).data[0]}
            />
            <Routes/>
        </div>
  );
};
export default MainComponent;
