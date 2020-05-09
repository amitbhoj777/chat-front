import React, { useEffect, useState } from "react";
import io  from "socket.io-client";
import axios from "axios";

import "./chat.scss";
import ChatHistory from "./chatHistory.jsx";
import ChatBox from "./chatBox.jsx";
import Profile from "./profile.jsx";
import Loader from  "../commonComponent/loader.js";
import EmptyPage from  "../commonComponent/emptyPage.js";

class Chat extends React.Component{
    constructor(props){
        super(props)
        let socket = io.connect("http://localhost:5000");
        let user  = window.location.href.split('?')[1]
        this.state={
            response:[],friendList:[],
            selectedFriendData:{},
            endpoint:"http://localhost:5000",
            socket:socket,user:user,
            showLoader:true,pageNo:1
        }
        this.getUserFriends()
        // this.getChatHistory()

    }
    componentDidMount(){
        this.state.socket.on("show-msg", (data)=>{
            console.log(' data******************************************', this.state.response)
            if((data.toId == JSON.parse(sessionStorage.getItem('login')).data[0].id) && 
                (data.fromId == (this.state.selectedFriendData&&this.state.selectedFriendData.id)) ){
                console.log(' if******************************************',data)
                let responseData = this.state.response||[]
                    responseData.push(data)
                this.setState({response:responseData})
                setTimeout(()=>{
                    const messages = document.getElementById('chatBox');
                    messages.scrollTop = messages.scrollHeight;
                },0)
            }
        })
    }

    getUserFriends(name) {
        let params = {}
            params.id = JSON.parse(sessionStorage.getItem('login')).data[0].id
            if(name){
                params.searchFor = name
            }
        this.setState({
            showLoader:true
        })

        let token = JSON.parse(sessionStorage.getItem('login')).token

        axios({
          method: 'GET',
          url: 'http://localhost:5000/friendsList',
          params: params,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',        
            "Authorization":token             
          }
        }).then((res) =>{
            console.log(res,'getUserFriends getUserFriends ') 
            let friendList = res.data&&res.data.result &&res.data.result.data
            this.setState({friendList,showLoader:false})
        });
      }
    
    getChatHistory(obj,pageNo) {
        this.setState({
            showLoader:true
        })
        let params = {}
            params.fromId = JSON.parse(sessionStorage.getItem('login')).data[0].id
            params.toId = (obj&&obj.id) || (this.state.selectedFriendData && this.state.selectedFriendData.id)
            params.pageSize = 20
            params.pageNo = pageNo || this.state.pageNo
        
        let token = JSON.parse(sessionStorage.getItem('login')).token
        
        axios({
          method: 'GET',
          url: 'http://localhost:5000/getChatHistory',
          params: params,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',         
            'Cache': 'no-cache', // This is set on request
            'credentials': 'same-origin', // This is set on request
            'Cookie': '1234', // This is missing from request      
            "Authorization":token   
          }
        }).then((res) =>{
            console.log(res,'getChatHistory getChatHistory ') 
            if(pageNo == 1){
                let response = res.data&&res.data.result &&res.data.result.data
                this.setState({response,showLoader:false})
            }else{
                let data = res.data&&res.data.result &&res.data.result.data
                let response = data.concat(this.state.response);
                this.setState({response,showLoader:false})
            }
        });
    }
    
    onInputChange(event){
        this.setState({inputString:event.target.value})
        if(event.keyCode == 13){
            this.sendMessage(event.target.value)
        }
    }
    sendMessage(data){
        console.log(this.state.response,' sendMessagesendMessage sendMessage')
        if(this.state.inputString || data){
            let message = {}
                message.toId = this.state.selectedFriendData&&this.state.selectedFriendData.id
                message.fromId = JSON.parse(sessionStorage.getItem('login')).data[0].id
                message.message = data || this.state.inputString
                this.state.socket.emit("send-msg",message)
            let responseData = this.state.response||[]
                responseData.push(message)
            this.setState({response:responseData})
            setTimeout(()=>{
                const messages = document.getElementById('chatBox');
                messages.scrollTop = messages.scrollHeight;
            },0)
            
        }
    }
    selectFriend(obj){
        console.log(obj)
        let pageNo = 1
        this.getChatHistory(obj,pageNo)
        this.setState({
            selectedFriendData:obj,
            response:[],pageNo
        })
        setTimeout(()=>{
            const messages = document.getElementById('chatBox');
            messages.scrollTop = messages.scrollHeight;
        },500)
    }
    searchFirend(event){
        console.log(event.target.value,'eeeeeeeeeeeeeeeeee')
        this.getUserFriends(event.target.value)
    }
    onScrollChange(){
        let messages = document.getElementById('chatBox');
        console.log(messages.scrollHeight,'messages.scrollHeight')
        let topPosition = messages.scrollTop;
        if(topPosition == 0){
            messages.scrollTop = 1050
            console.log(topPosition,'topPositiontopPosition')
            let pageNo = this.state.pageNo + 1 
            this.getChatHistory(this.state.selectedFriendData,pageNo)
            this.setState({
                pageNo
            })
        }
    }
    render(){

    console.log(this.state.showLoader,' response ',this.state.user,'user ',this.state.friendList,'friendList',this.state.selectedFriendData,'selectedfriend')

        return(
        <div class="chatContainer">
            {this.state.showLoader && <Loader/>}
            <ChatHistory
                friendList = {this.state.friendList}
                selectFriend = {(obj)=>this.selectFriend(obj)}
                selectedFriendData ={this.state.selectedFriendData}
                searchFirend = {(e)=>this.searchFirend(e)}
                showLoader = {this.state.showLoader}
            />
            {! (this.state.selectedFriendData&&this.state.selectedFriendData.id) && <EmptyPage
                message="Please select the user."
            />}
            {this.state.selectedFriendData&&this.state.selectedFriendData.id &&<ChatBox
                sendMessage = {()=>this.sendMessage()}
                onInputChange = {(e)=>this.onInputChange(e)}
                chatData = {this.state.response}
                onScrollChange = {()=>this.onScrollChange()}
            />}
            <Profile
                selectedFriendData ={this.state.selectedFriendData}
            />
        </div>
        )
    }
}
export default Chat;