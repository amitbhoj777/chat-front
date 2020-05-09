import React from 'react'

export function ChatHistory(props){

	function createList(friendList){
		let data = []
		if(friendList && friendList.length>0){
			data = friendList.map((obj,index)=>{
				console.log(obj)
				return(
					<li onClick={()=>props.selectFriend(obj)}>
						<div class={`contact ${(props.selectedFriendData &&props.selectedFriendData.id == obj.id) ? "active":""}`}>
							<div class="imageSection">
								<img src="./face3.jpg"/>
							</div>
							<div class="textArea">
								<h3>{obj.name}</h3>
								<p>wendy, I like you...</p>
							</div>
							
						</div>
					</li>
				)
			})
		}
		return data
	}
    return(
        <section class="chatHistoryArea">
			<div class="searchChatContact">
				<input type="text" name="search" placeholder="Search" onChange={(e)=>props.searchFirend(e)}/>
			</div>
			<div class="histories">
				<ul>
                	{createList(props.friendList)}
				</ul>
			</div>
		</section>
    )
}
export default ChatHistory