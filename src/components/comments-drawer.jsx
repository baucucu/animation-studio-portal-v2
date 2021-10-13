import React,{useEffect} from 'react'
import qs from 'qs';
import {Block} from 'framework7-react';
const commentBox = window.commentBox;



const CommentsDrawer = (props) => {
  
  useEffect(() => {    
    console.log("commentsbox id: ",props?.commentBoxId);
    commentBox('5707536883777536-proj', {
      createBoxUrl(boxId, pageLocation) {
        const relevantParams = {
            'commentboxId': props.commentBoxId
        };
        pageLocation.search = qs.stringify(relevantParams); // we will now include "?page_id=5" in the box URL
        pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
        return pageLocation.href; // return url string
      }
    })
  },[])
  
  return (
    <div className="commentbox"/>
);
}

export default CommentsDrawer