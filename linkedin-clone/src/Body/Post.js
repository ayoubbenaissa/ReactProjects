import React, { forwardRef } from 'react';

import InputOption from './InputOption.js';

import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import './Post.css';

const Post = forwardRef(({ name, description, content, photoUrl}, ref) => {

    return (
        <div ref={ref} className="post">
            <div className="post__header">
            <Avatar className="postHeader__icon" src={photoUrl}>{name[0]}</Avatar>
            <div className="post__info">
                <h2>{name || 'Linkedin user'}</h2>
                <p>{description || 'no description'}</p>
            </div>
            </div>
            <div className="post__body">
                <p>{content || 'no content'}</p>
            </div>
            <div className="post__buttons">
                <InputOption Icon={ThumbUpOutlinedIcon} title="like" color="gray" />
                <InputOption Icon={ChatOutlinedIcon} title="comment" color="gray" />
                <InputOption Icon={ShareOutlinedIcon} title="share" color="gray" />
                <InputOption Icon={SendOutlinedIcon} title="send" color="gray" />
            </div>
        </div>
    )
});

export default Post;
