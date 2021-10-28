import React, {useEffect} from 'react';
import {useStore} from 'framework7-react';
const commentBox = window.commentBox;
// class PageWithComments extends React.Component {

//     componentDidMount() {
        
//         this.removeCommentBox = commentBox('5630532146692096-proj');
//     }

//     componentWillUnmount() {

//         this.removeCommentBox();
//     }

//     render() {

//         return (
//             <div className="commentbox" id={this.props.commentBoxId}/>
//         );
//     }
// }

function PageWithComments({commentBoxId}){
    const user = useStore('user')
    useEffect(() => {
        // console.log("user: ",user)
        const removeCommentBox = commentBox('5707536883777536-proj',{
            singleSignOn: {
                buttonText: 'Single Sign-On', // The text to show on the sign in button.
                buttonIcon: '', // The icon to show on the sign in button. Must be an absolute URL.
                buttonColor: '', // The sign in button's color. Default is black.
                autoSignOn: true, // Attempts to automatically log the user into CommentBox.io with custom auth.
                onSignOn(onComplete, onError) {
                    // pass in the signed user payload to onComplete.
                    user.functions.onLogin({
                        "sub": user.id, // integer or string representing your user's unique ID
                        "email": user._profile.data.email, // must be unique as well
                        "name": user.customData.name, // required, not empty
                        "picture": "", // an absolute URL, or empty
                        "iat": Date.now(), // date issued as a unix timestamp (in seconds)
                        "exp": Date.now()+300 // token expiry date, must be no more than 10 minutes after iat
                        })
                    .then(response => {

                        if(response.ok) {
                            return response.text();
                        }
                        throw new Error('Could not sign in.');
                    })
                    .then(token => {
                        onComplete(token);
                    })
                    .catch(err => {
                        onError(err);
                    });
                },
                onSignOut() {
                    // optionally log the user out of your website's native auth system.
                }
            }
        })
        return removeCommentBox()
    },[])

    return(
        <div className="commentbox" id={commentBoxId}/>
    )
}

export default PageWithComments
