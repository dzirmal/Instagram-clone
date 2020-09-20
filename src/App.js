import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { db, auth } from './firebase'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Input } from '@material-ui/core';
import Header from './components/Header'
import Post from './components/Post';
import { ContactPhone } from '@material-ui/icons';


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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);


  // Getting info from firebase
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has Logged in.
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          // don't update userName
        } else {
          // if we just created someone
          return authUser.updateProfile({
            displayName: username
          })
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup action
      unsubscribe();
    }
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
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
              placeholder='username'
              type='text'
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
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Header />
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      <h1>This is working</h1>


      {
        posts.map(({ id, post }) => (
          <Post
            key={id}
            userName={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))
      }
    </AppDiv>
  );
}

export default App;

const AppDiv = styled.div`
`