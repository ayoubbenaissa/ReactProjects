import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

import { db } from '../firebase';
import firebase from 'firebase';

import InputOption from './InputOption';
import Post from './Post';

import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';

import './Feed.css';

function Feed() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("posts")
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ));
    }, []);

    const sendPost = e => {
        e.preventDefault();
        // add post to DB:
        db.collection("posts").add({
            name: user.displayName || 'linkedIn user',
            description: user.email || 'email',
            content: content,
            photoUrl: user.photoUrl || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log(' ** post added ** ');
        setContent('');
    };

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input type="text" placeholder="Start a post" value={content} onChange={e => setContent(e.target.value)}/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="photo" color="#70B5f9"/>
                    <InputOption Icon={SubscriptionsIcon} title="video" color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title="event" color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDayIcon} title="write article" color="#7FC15E"/>
                </div>
            </div>
            {posts.map(({ id, data: {name, description, content, photoUrl}}) => (<Post key={id} name={name} description={description} content={content} photoUrl={photoUrl}/>))}
        </div>
    )
}

export default Feed;
