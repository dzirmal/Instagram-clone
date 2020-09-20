import React from 'react'
import styled from 'styled-components'

import Avatar from '@material-ui/core/Avatar'

function Post({ userName, caption, imageUrl }) {

    return (
        <PostDiv>
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt='Maiwand'
                    src='https://images.unsplash.com/photo-1436902773985-52c1040b6100?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
                />
                <h3>{userName}</h3>
            </div>
            <img src={imageUrl} />
            <h4><strong>{userName}</strong> {caption}</h4>
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
`