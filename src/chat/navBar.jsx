import React from 'react'

const logout = ()=>{
	sessionStorage.clear('login')
}
export function NavBar(props){

	console.log(props,'llllllllllll')
    return(
        <section class="navSection">
			<div class="userLogoContainer" onClick={()=>window.location.href="/editUser"}>
				<img src="./face1.jpg"/>
				<span>{props.userData&&props.userData.name}</span>
			</div>
			<div class="navLinks">
				<ul>
					<li>
						<div class="iconsArea">
							<a href="/contacts">
								<div class="imageSection">
									<img src="./user.png"/>
								</div>
								<span class="tooltiptext">Contacts</span>
							</a>
						</div>
					</li>
					<li>
						<div class="iconsArea">
							<a href="/chat">
								<div class="imageSection">
									<img src="./chatm.png"/>
								</div>
								<span class="tooltiptext">Chat</span>

							</a>
						</div>
					</li>
					<li>
						<div class="iconsArea">
							<a href="/login" onClick={()=>logout()}>
								<div class="imageSection">
									<img src="./logout.png"/>
								</div>
								<span class="tooltiptext">Logout</span>

							</a>
						</div>
					</li>
				</ul>
			</div>
		</section>
    )
}
export default NavBar