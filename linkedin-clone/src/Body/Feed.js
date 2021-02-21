import React from 'react';

import InputOption from './InputOption';
import Post from './Post';

import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';

import './Feed.css';

function Feed() {
    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input type="text" placeholder="Start a post"/>
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="photo" color="#70B5f9"/>
                    <InputOption Icon={SubscriptionsIcon} title="video" color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title="event" color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDayIcon} title="write article" color="#7FC15E"/>
                </div>
            </div>
            <Post name="Saitama" description="test" content="content" />
        </div>
    )
}

export default Feed;
