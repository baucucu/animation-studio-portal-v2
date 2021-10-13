import React,{useEffect, useState} from 'react'
import qs from 'qs';
import {f7} from 'framework7-react';
const commentBox = window.commentBox;



const CommentsDrawer = (props) => {

  const [commentBoxId, setCommentBoxId] = useState(props.commentBoxId)

  useEffect(() => {
    f7.on('showComments', (e) => {console.log("showComments event received:",e); setCommentBoxId(String(e.dealId)+"-"+String(e.sceneId))}) 
  },[])

  useEffect(() => {
    console.log("commentBoxId changed: ", commentBoxId)
  },[commentBoxId])

  useEffect(() => {    
   const removeCommentBox = commentBox('5707536883777536-proj', {
      createBoxUrl(boxId, pageLocation) {
        console.log("commentBox running: ", boxId, pageLocation)
        const relevantParams = {
            'commentboxId': commentBoxId
        };
        pageLocation.search = qs.stringify(relevantParams); // we will now include "?page_id=5" in the box URL
        pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
        return pageLocation.href; // return url string
      }
    })

    return removeCommentBox()
  },[commentBoxId])

  return (
    <div className="commentbox"  id={commentBoxId} />
);
}

export default CommentsDrawer