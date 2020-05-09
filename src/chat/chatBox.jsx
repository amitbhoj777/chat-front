import React,{useEffect,useState} from 'react'
import Loader from  "../commonComponent/loader.js";

export function ChatBox(props){
	const [state,setState] = useState(0)

	function createList(chatData){
		let data = []
		if(chatData && chatData.length>0){
			data = chatData.map((obj,index)=>{
				console.log(obj)
				return(
					<li>
						<div class={`message ${(JSON.parse(sessionStorage.getItem('login')).data[0].id == obj.fromId) ? "rightSide" : ""}`}>
							<div class="imageSection">
								<img src="./face2.jpg"/>
							</div>
							<p class="text">{obj.message}</p>
						</div>
					</li>
				)
			})
		}
		return data
	}
	console.log(props.chatData,'chatData')
    return(
        <section class="chattingArea">
			<div class="topSection">
				<span class="timeZone">17:56</span>
			</div>
			<div class="chatBox" id="chatBox" onScroll={()=>props.onScrollChange()}>
				<ul>
					{createList(props.chatData)}
				</ul>
			</div>
			<div class="chatInputSection">
                <div class="inputBox">
    				<input type="text" name="" placeholder="type something..." onKeyUp={(e)=>props.onInputChange(e)}/>
                </div>
                <div class="button">
                    <input type="submit"  name="Send" onClick={()=>{props.sendMessage()}}/>
                </div>
			</div>
		</section>
    )
}
export default ChatBox