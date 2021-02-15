import React from 'react';

import './SideBar.css';

import { Avatar } from '@material-ui/core';

function SideBar() {

    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    )

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://i.pinimg.com/originals/a9/eb/bf/a9ebbfe7cc0fde6dd957be2052040565.jpg" alt=""/>
                <Avatar className="sidebar__avatar"/>
                <h2>Ayb</h2>
                <h4>dev</h4>
            </div>
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed your profile</p>
                    <p className="sidebar__statNumber">53</p>
                </div>
                <div className="sidebar__stat">
                    <p>views of your posts</p>
                    <p className="sidebar__statNumber">125</p>
                </div>
            </div>
            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem('reactjs')}
                {recentItem('front-end')}
            </div>
        </div>
    )
}

export default SideBar;
