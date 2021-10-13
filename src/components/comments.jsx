import React from 'react';
// import commentBox from 'commentbox.io';
const commentBox = window.commentBox;

class PageWithComments extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5707536883777536-proj');
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

export default PageWithComments
