import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import { db, storage } from '../firebase'


function ImageUpload({ username }) {
    const [image, setImage] = useState(null)
    // const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadsTask = storage.ref(`images/${image.name}`).put(image);

        uploadsTask.on(
            "state_changed",
            (snapshot) => {
                // progress function (The visional part)
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                // Error function ...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function ...
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        });

                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    });
            }
        )
    }

    return (
        <ImageUploadDiv>

            <progress
                className='imageUpload__progress'
                value={progress}
                max='100%' />

            <input
                className='text__input'
                type="text"
                placeholder='Enter a caption'
                value={caption}
                onChange={event => setCaption(event.target.value)} />

            <input type="file" onChange={handleChange} />

            <Button onClick={handleUpload}>
                Upload
      </Button>

        </ImageUploadDiv>
    )
}

export default ImageUpload


const ImageUploadDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;

    & > progress {
        width: 100%;
    }
`