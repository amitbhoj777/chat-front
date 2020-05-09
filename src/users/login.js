import React from 'react';
import { useState } from 'react';
import './login.scss';
import axios from "axios";

function Login() {
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	const [signInData ,setSignInData] = useState(null)

  function signup(){
    window.location.href = '/signup'
  }
  function handleSubmit(event) {
    event.preventDefault();
    Login();
  }

  function Login(){
    let params = {}
        params.username = username
        params.password = password

    axios({
      method: 'POST',
      url: 'http://localhost:5000/login',
      data: JSON.stringify(params),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',                  
      }
    }).then((res) =>{
      if(res.data && res.data.result){
        setSignInData(res.data.result)
        
        if(res.data && res.data.result && res.data.result.status == 0){
          sessionStorage.setItem('login',JSON.stringify(res.data.result))
          setTimeout(()=>{
              window.location.href = '/chat'
          },2000)
        }
      }
    });
  }

  return (
    <div className="mainBox">
      <div class="login-box">
        <span class="formLogo">Welcome!</span>
        <div class="workArea">
        <div class="imageSection">
          <img src="./logos.jpg"  />
        </div>
      <div class="formCont">
        <form onSubmit={handleSubmit} >
          <div class="inputArea">
            <input
              // value={Username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
              name="username"
              required
            />
          </div>
          <div class="inputArea">
            <input
              // value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              name="password"
              required
            />
          </div>
        <div class="combineButtons">
            <div class="buttonArea">
                <button type="submit" >Login</button>
            </div>
            <div class="buttonArea">
                <button type="button" onClick={signup}>Sign up</button>
            </div>
        </div>
        </form>
      </div>
      </div>
		</div>
    {signInData && <div class={`toastMessage ${signInData.status == 0 ? "success":"fail"}`}>{signInData.message}</div>}
	</div>
     
  );
}
    

export default Login;
