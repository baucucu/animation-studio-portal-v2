import React,{useEffect} from 'react'
import {Block} from 'framework7-react';
const commentBox = window.commentBox;

const CommentsDrawer = (props) => {
  useEffect(() => {
    const removeCommentBox = commentBox('5707536883777536-proj', { defaultBoxId: props?.cardId });
  },[])
  return (
    <Block className="commentbox" />
);
}

export default CommentsDrawer