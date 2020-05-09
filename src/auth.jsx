import React, { useEffect, useState } from "react";

function Auth(props){
    useEffect(()=>{
        let check = setInterval(()=>{
            if(!sessionStorage.getItem('login')){
                switch(window.location.href.split('/')[3]){
                    case 'signup':
                    break;
                    default:
                        if(window.location.href.split('/')[3] !='login'){
                            if(!window.location.href.split('/')[3].split("?")[1]){
                                window.location.href = '/login'
                            }
                        }
                    break;
                }
            }
            clearInterval(check)
        },500)
    },[])
    
    return props.children
}
export default Auth;