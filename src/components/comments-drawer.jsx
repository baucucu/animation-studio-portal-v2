import React,{useEffect} from 'react'
import {Block} from 'framework7-react';
const commentBox = window.commentBox;

const CommentsDrawer = (props) => {
  useEffect(() => {
    console.log("commentsbox id: ",props?.id)
    commentBox('5707536883777536-proj');
  },[])
  return (
    <div className="commentsbox" id={props?.id}/>
);
}

export default CommentsDrawer