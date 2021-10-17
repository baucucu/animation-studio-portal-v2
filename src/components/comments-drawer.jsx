import React,{useEffect, useState} from 'react'
import qs from 'qs';
import {f7} from 'framework7-react';
const commentBox = window.commentBox;



// const CommentsDrawer = (props) => {

//   useEffect(() => {
//     console.log("commentBoxId changed: ", props.commentBoxId)
//   },[])

//   useEffect(() => {    
//    const removeCommentBox = commentBox('5707536883777536-proj')
//     return removeCommentBox()
//   },[])

//   return (
//     <div className="commentbox"  id={props.commentBoxId} />
// );
// }

// export default CommentsDrawer


class PageWithComments extends React.Component {

  componentDidMount() {

      this.removeCommentBox = commentBox('5707536883777536-proj');
  }

  componentWillUnmount() {

      this.removeCommentBox();
  }

  render() {

      return (
          <div className="commentbox" id={props.commentBoxId}/>
      );
  }
}

export default PageWithComments