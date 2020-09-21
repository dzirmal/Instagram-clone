import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Avatar from '@material-ui/core/Avatar'
import { db } from '../firebase';
import firebase from 'firebase'

function Post({ username, caption, imageUrl, postId, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    // To get the comments
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    const postComment = (event) => {
        event.preventDefault();

        db
            .collection('posts').doc('postId').collection('comments').add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setComment('');
    }

    return (
        <PostDiv>
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt='Maiwand'
                    src='https://images.unsplash.com/photo-1436902773985-52c1040b6100?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
                />
                <h3>{username}</h3>
            </div>
            <img src={imageUrl} />
            <h4><strong>{username}</strong> {caption}</h4>

            {/* Post the comments */}
            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            <form>
                <input
                    className='post__input'
                    type="text"
                    placeholder='Add a comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='post__button'
                    disabled={!comment}
                    type='submit'
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
        </PostDiv>
    )
}

export default Post

const PostDiv = styled.div`
    background-color: white;
    max-width: 500px;
    border: 1px solid lightgray;
    margin-bottom: 45px;
    & > div {
        display: flex;
        align-items: center;
        padding: 20px;
        & > h3 {
        margin-left: 10px;
        }
        &.post__comments {
            padding: 20px;
        }
    }
    & > img {
        width: 100%;
        object-fit: contain;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
    }

    & > h4 {
        font-weight: normal;
        padding: 20px;
    }
    & > form {
        display: flex;
        margin-top: 20px;
        & > input {
            flex: 1;
            border: none;
            padding: 10px;
            border-top: 1px solid lightgray;
        }
        & > button {
            flex: 0;
            border: none;
            border-top: 1px solid lightgray;
            color: #6082a3;
            background-color: transparent;
        }
    }
`