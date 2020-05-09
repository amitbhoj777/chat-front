import React from 'react';
import './signup.scss';
import { useState } from 'react';
import axios from "axios";

function Signup() {

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
	const [signUpData ,setSignUpData] = useState(null)

  function handleSubmit(event) {
    event.preventDefault();
    signUpUser();
  }
  function signUpUser(){
    let params = {}
        params.name = name
        params.username = username
        params.password = password
        params.email = email
        params.mobile = mobile

    axios({
      method: 'POST',
      url: 'http://localhost:5000/signup',
      data: JSON.stringify(params),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',                  
      }
    }).then((res) =>{
      if(res.data && res.data.result && res.data.result.status == 0){
        setSignUpData(res.data.result)
        setTimeout(()=>{
          window.location.href = '/login'
        },2000)
      }
    });
  }
  return (
    <div class="mainBoxSignUp">
        <div class="login-box">
            <div class="imageSection">
              <img src="./logos.jpg"  />
            </div>
            <div class="formCont">
                <form onSubmit={handleSubmit}>
                <div class="inputArea">
                  <input
                    // value={Name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Name"
                    type="text"
                    name="Name"
                    required
                  />
                  </div>
                  <div class="inputArea">
                  <input
                    // value={Username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    type="text"
                    name="username"
                    required
                  />
                 </div>
                  <div class="inputArea">
                  <input
                    // value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                    required
                  />
                  </div>
                  <div class="inputArea">
                  <input
                    // value={password2}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    type="text"
                    name="email"
                    required
                  />
                  </div>
                  <div class="inputArea">
                  <input
                    // value={mobile}
                    onChange={e => setmobile(e.target.value)}
                    placeholder="Enter phone number"
                    type="text"
                    name="mobile"
                    required
                  />
                  </div>
                  <div class="buttonArea">
                      <button type="submit">Signup for free</button>
                  </div>
                  <div class="buttonArea">
                      <button type="button" onClick={()=>window.location.href = '/login'}>Login</button>
                  </div>
                </form>
            </div>
      </div>
      {signUpData && <div class={`toastMessage ${signUpData.status == 0 ? "success":"fail"}`}>{signUpData.message}</div>}

	</div>
     
  );
}
    

export default Signup;