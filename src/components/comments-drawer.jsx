import React,{useEffect} from 'react'
import {Block} from 'framework7-react';
const commentBox = window.commentBox;



const CommentsDrawer = (props) => {
  console.log("commentsbox id: ",props?.commentBoxId);
  useEffect(() => {    
    commentBox('5707536883777536-proj');
  },[])
  return (
    <div className="commentbox" id={props.commentBoxId}/>
);
}

export default CommentsDrawer