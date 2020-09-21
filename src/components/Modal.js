import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { db, auth } from '../firebase'



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

function MyModal() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle)
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

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
    )
}

export default MyModal

