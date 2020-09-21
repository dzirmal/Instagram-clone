import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'


function Header({ username }) {
    const [openSignIn, setOpenSignIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <HeaderDiv>
            <img src='http://pngimg.com/uploads/instagram/instagram_PNG5.png' alt='' />
            {user ? (
                <Button onClick={() => auth.signOut()}>Sign Out</Button>
            ) :
                <div className="app__loginContainer">
                    <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>

                </div>
            }
        </HeaderDiv>
    )
}

export default Header

const HeaderDiv = styled.div`
object-fit: contain;
background-color: white;
padding: 20px;
border-bottom: 1px solid lightgray;
    & > img {
        height: 40px;
    }
`