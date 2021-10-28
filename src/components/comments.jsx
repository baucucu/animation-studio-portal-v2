import React, {useEffect} from 'react';
const commentBox = window.commentBox;

class PageWithComments extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5630532146692096-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.commentBoxId}/>
        );
    }
}

// function PageWithComments({commentBoxId}){

//     useEffect(() => {
//         const removeCommentBox = commentBox('5707536883777536-proj')
//         return removeCommentBox()
//     },[])

//     return(
//         <div className="commentbox" id={commentBoxId}/>
//     )
// }

export default PageWithComments
