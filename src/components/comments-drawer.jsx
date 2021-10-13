import React,{useEffect} from 'react'
import {Block} from 'framework7-react';
const commentBox = window.commentBox;

const CommentsDrawer = (props) => {
  useEffect(() => {
    console.log("commentsbox id: ",props?.id)
    commentBox('5707536883777536-proj',{
      defaultBoxId: props.id
    });
  },[])
  return (
    // <div className="commentbox" />
    <iframe src={`https://app.commentbox.io/5707536883777536-proj?id=commentbox&amp;url=https%3A%2F%2Fwww.studioproject.io%2F%23${props.id}&amp;tlc_param=tlc&amp;background_color=&amp;text_color=&amp;subtext_color=&amp;sort_order=best`} frameborder="0" scrolling="no" style="width: 100%" data-comments-loaded="true" height="1378px"></iframe>
);
}

export default CommentsDrawer