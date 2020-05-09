import React from 'react'

export function Profile(props){
    return(
        <section class="profileArea">
			<div class="searchChatContact">
				<input type="text" name="search" placeholder="Search"/>
			</div>
			<div class="profile">
				<div class="imageSection">
					<img src="./face4.jpg"/>
				</div>
				<h2 class="heading">{props.selectedFriendData&&props.selectedFriendData.name}</h2>
				<span class="jobTitle">Juinor developer</span>
			</div>
		</section>
    )
}
export default Profile