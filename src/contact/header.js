import React, { useEffect, useState } from "react";

const HeaderStrip = (props) => {
	const [usersData ,setUsersData] = useState([])

  return (
        <div className="headerArea">
            <div class="inputContainer">
                <label class="label">Search</label>
                <div class="inputArea">
                    <input type="text" placeholder="Search.." onChange={(e)=>props.onChangeInput(e)}/>
                </div>
            </div>
        </div>
  	);
};
export default HeaderStrip;
