import React,{useEffect} from 'react'
// import commentBox from 'commentbox.io';

const commentBox = window.commentBox;

const CommentsDrawer = () => {
  useEffect(() => {
    const removeCommentBox = commentBox('5707536883777536-proj');
  },[])
  return (
    <div style={{minwidth:300}} className="commentbox" />
);
}

export default CommentsDrawer