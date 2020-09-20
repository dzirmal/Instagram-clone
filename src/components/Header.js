import React from 'react'
import styled from 'styled-components'


function Header() {

    return (
        <HeaderDiv>
            <img src='http://pngimg.com/uploads/instagram/instagram_PNG5.png' alt='' />
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