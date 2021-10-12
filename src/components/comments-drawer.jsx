import React,{useEffect} from 'react'
import {Block} from 'framework7-react';
const commentBox = window.commentBox;

const CommentsDrawer = () => {
  useEffect(() => {
    const removeCommentBox = commentBox('5707536883777536-proj');
  },[])
  return (
    <Block className="commentbox" />
);
}

export default CommentsDrawer