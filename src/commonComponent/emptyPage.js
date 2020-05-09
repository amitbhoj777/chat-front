import React from "react"

export const EmptyPage = (props)=>{
    return(
        <div class="emptyPage">
            <div class="imageSection">
                <img src='./selectUser.png'/>
            </div>
            <div class="textArea">{props.message}</div>
        </div>
    )
}
export default EmptyPage;