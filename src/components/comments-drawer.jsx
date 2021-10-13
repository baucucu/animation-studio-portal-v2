import React,{useEffect, useState} from 'react'
import qs from 'qs';
import {f7} from 'framework7-react';
const commentBox = window.commentBox;



const CommentsDrawer = (props) => {

  useEffect(() => {
    console.log("commentBoxId changed: ", props.commentBoxId)
  },[props])

  useEffect(() => {    
   const removeCommentBox = commentBox('5707536883777536-proj', {
      createBoxUrl(boxId, pageLocation) {
        console.log("commentBox running: ", boxId, pageLocation)
        const relevantParams = {
            'commentboxId': props.commentBoxId
        };
        pageLocation.search = qs.stringify(relevantParams); // we will now include "?page_id=5" in the box URL
        pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
        return pageLocation.href; // return url string
      }
    })

    return removeCommentBox()
  },[])

  return (
    <div className="commentbox"  id={props.commentBoxId} />
);
}

export default CommentsDrawer