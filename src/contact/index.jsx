import React, { useEffect, useState } from "react";
import "./contact.scss";
import HeaderStrip from  "./header.js";
import Loader from  "../commonComponent/loader.js";
import axios from "axios";

let tableCustomData = [
	{key:'Id',value:'id'},
	{key:'Name',value:'name'},
	{key:'Username',value:'username'},
	{key:'Mobile',value:'mobile'},
	{key:'DOB',value:'dob'},
	{key:'Education',value:'education'},
	{key:'Job Profile',value:'job'},
	{key:'Email',value:'email'},
	{key:'Address',value:'address'},
	{key:'Action',value:'actions'},
]
const ContactPage = (props) => {
	const [usersData ,setUsersData] = useState([])
	const [showLoader ,setShowLoader] = useState(false)
	const [addFriendData ,setAddFriendData] = useState(null)

	function getAllusers(name) {
		let params={}
			params.id = JSON.parse(sessionStorage.getItem('login')).data[0].id
		if(name){
			params.searchFor = name
		}
		setShowLoader(true)
		let token = JSON.parse(sessionStorage.getItem('login')).token
		axios({
		  	method: 'GET',
		  	url: 'http://localhost:5000/getAllusers',
		  	params: params,
		  	headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Accept': 'application/json',    
			'Cache': 'no-cache', // This is set on request
			'credentials': 'include', // This is set on request
			"Set-Cookie":"1234",
			"Authorization":token
			  },
			  credentials: 'include'
		}).then((res) => {
			if(res&&res.data&&res.data.result&&res.data.result.data){
				let usersData = res.data.result.data
				setUsersData(usersData)
				setShowLoader(false)
			}
		});
	}
	
	useEffect(() => {
		getAllusers();
	}, []);
	
	useEffect(() => {
		setTimeout(()=>{
			setAddFriendData(null);
		},2000)
	}, [addFriendData]);

	function addFriend(obj){
		console.log(obj,'objjjjjjjjjjjjjjjjj')
		let params={}
			params.id = JSON.parse(sessionStorage.getItem('login')).data[0].id
			params.friendsId = [obj.id]
		setShowLoader(true)
		let token = JSON.parse(sessionStorage.getItem('login')).token
		axios({
			method: 'POST',
			url: 'http://localhost:5000/addUserToFriendList',
			data: params,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Accept': 'application/json',           
				"Authorization":token       
			}
	  	}).then((res) => {
			  console.log(res,'addFriend')
		  	if(res&&res.data&&res.data.result&&res.data.result.status == 0){
				let addFriendData = res.data.result
				setShowLoader(false)
				setAddFriendData(addFriendData)
		  	}
	  	});
	}
	function onChangeInput(event){
		console.log(event.target.value,'eveeeeeeeeeeeeeeeeeee')
		getAllusers(event.target.value)
	}
	function createTableHeading(){
		let data = tableCustomData.map((obj,index)=>{
			return(
				<th>{obj.key}</th>
			)
		})
		return data;
	}
	function createCustomTd(rowObj,rowIndex){
		let tdData = tableCustomData.map((tdObj,headIndex)=>{
			if(tdObj.value == 'actions'){
				return(
					<td class="actions">
						<button onClick={()=>addFriend(rowObj)}>Add friend</button>
					</td>
				)
			}else{
				return(
					<td>{rowObj[tdObj.value]}</td>
				)
			}
		})
		return tdData;
	}
	const createTableRows = (usersData,addFriend) =>{
		let rows = usersData&&usersData.length>0&&usersData.map((obj,index)=>{
			return(
				<tr>
					{createCustomTd(obj,index)}
				</tr>
			)
		})
		return rows
	}
  	return (
        <div class="contactCont">
			{showLoader && <Loader/>}
			<HeaderStrip
				onChangeInput={(e)=>onChangeInput(e)}
			/>
			<div class="tableContainer">
				<table>
					<thead>
						<tr>
							{createTableHeading()}
						</tr>
					</thead>
					<tbody>
						{createTableRows(usersData,(obj)=>addFriend(obj))}
					</tbody>
				</table>
			</div>
            {addFriendData && <div class={`toastMessage ${addFriendData.status == 0 ? "success":"fail"}`}>{addFriendData.message}</div>}
		</div>
  	);
};
export default ContactPage;
