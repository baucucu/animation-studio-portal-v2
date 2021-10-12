import React,{useEffect} from 'react'
import {Block} from 'framework7-react';
const commentBox = window.commentBox;

const CommentsDrawer = (props) => {
  useEffect(() => {
    const removeCommentBox = commentBox('5707536883777536-proj', { defaultBoxId: props?.id });
  },[])
  return (
    <Block className="commentbox" id={props?.cardId}/>
);
}

export default CommentsDrawer