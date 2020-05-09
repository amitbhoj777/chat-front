import React from 'react';
import '../users/signup.scss';
import { useState } from 'react';
import axios from "axios";

function EditUser() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setmobile] = useState("");
    const [editUserData, seteditUserData] = useState(null)

    function handleSubmit(event) {
        event.preventDefault();
        editUserUser();
    }
    function editUserUser() {
        let params = {}
        params.name = name
        params.username = username
        params.password = password
        params.email = email
        params.mobile = mobile

        axios({
            method: 'POST',
            url: 'http://localhost:5000/editUser',
            data: JSON.stringify(params),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((res) => {
            if (res.data && res.data.result && res.data.result.status == 0) {
                seteditUserData(res.data.result)
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000)
            }
        });
    }
    return (
        <div class="mainBoxEditUser">
            <div class="login-box">
                <div class="headerSection withTwoFields">
                    <h3>Edit User</h3>
                    <span class="close">x</span>
                </div>
                <div class="workArea">
                    <div class="formCont">
                        <form onSubmit={handleSubmit}>
                        <div class="inputTwoFields">
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
                            </div>
                            <div class="inputTwoFields">
                                <div class="inputArea">
                                    <input
                                        // value={Name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Enter DOB"
                                        type="text"
                                        name="Name"
                                        required
                                    />
                                </div>
                                <div class="inputArea">
                                    <input
                                        // value={Username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="Enter Job Profile"
                                        type="text"
                                        name="username"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="inputArea">
                                <input
                                    // value={password2}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter Education"
                                    type="text"
                                    name="email"
                                    required
                                />
                            </div>
                            <div class="inputArea">
                                <input
                                    // value={mobile}
                                    onChange={e => setmobile(e.target.value)}
                                    placeholder="Enter Address"
                                    type="text"
                                    name="mobile"
                                    required
                                />
                            </div>
                            <div class="inputArea">
                                <input
                                    // value={mobile}
                                    onChange={e => setmobile(e.target.value)}
                                    placeholder="Enter Email"
                                    type="text"
                                    name="mobile"
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
                            
                            <div class="buttonWrapper">
                                <div class="buttonArea">
                                    <button type="submit">Submit</button>
                                </div>
                                <div class="buttonArea">
                                    <button type="submit">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {editUserData && <div class={`toastMessage ${editUserData.status == 0 ? "success" : "fail"}`}>{editUserData.message}</div>}
        </div>
    );
}


export default EditUser;