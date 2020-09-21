import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { db, auth } from './firebase'
import InstagramEmbed from 'react-instagram-embed';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Input } from '@material-ui/core';
// import Header from './components/Header'
import Post from './components/Post';
//import { ContactPhone } from '@material-ui/icons';
import ImageUpload from './components/ImageUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle)
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        setUser(authUser);
      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username])

  // useEffect -> runs a piece of code based on a specific condition
  // Getting info from firebase
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <AppDiv className="App">

      {/* It give us the popup for logins */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form
            className='app__signupForm'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <center>
              <img
                className='app__headerImage'
                src='http://pngimg.com/uploads/instagram/instagram_PNG2.png'
                alt='Instagram'
                style={{ height: '80px' }}
              />
            </center>

            <Input
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input

              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form
            className='app__signupForm'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <center>
              <img
                className='app__headerImage'
                src='http://pngimg.com/uploads/instagram/instagram_PNG2.png'
                alt='Instagram'
                style={{ height: '80px' }}
              />
            </center>

            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

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

      <MainDiv>
        <AppPostsDiv>
          {
            posts.map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))
          }
        </AppPostsDiv>
        <AppInstagramDiv>
          <InstagramEmbed
            url='https://www.instagram.com/p/CD_5e5IDClT/?utm_source=ig_web_button_share_sheet'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        </AppInstagramDiv>
      </MainDiv>

      {/* I should try here to put condition of userEmail instead of displayName */}
      {user?.displayName ? (
        <ImageUpload
          username={user.displayName}
        />
      ) : (
          <h3>Sorry you need to login to upload</h3>
        )}
    </AppDiv>
  );
}

export default App;

const AppDiv = styled.div``

const HeaderDiv = styled.div`
object-fit: contain;
background-color: white;
padding: 20px;
border-bottom: 1px solid lightgray;
display: flex;
justify-content: space-between;
position: sticky;
z-index: 1;
top: 0;
    & > img {
        height: 40px;
        object-fit: contain;
        background-color: orange;
    }
`

const MainDiv = styled.div`
display: flex;
padding: 20px;
justify-content: center;
`
const AppPostsDiv = styled.div`
`
const AppInstagramDiv = styled.div`
  margin-left: 20px;
`