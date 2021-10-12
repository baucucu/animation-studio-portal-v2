import React,{useEffect} from 'react'
import {Block} from 'framework7-react';
const commentBox = window.commentBox;

const CommentsDrawer = (props) => {
  useEffect(() => {
    console.log("commentsbox id: ",props?.id)
    commentBox('5707536883777536-proj',{className:props?.id} );
  },[])
  return (
    <Block className={props?.id}/>
);
}

export default CommentsDrawer