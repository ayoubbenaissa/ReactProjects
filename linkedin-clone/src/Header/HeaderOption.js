import React from 'react';

import { Avatar } from '@material-ui/core';

import './HeaderOption.css';

function HeaderOption({ avatar, avatarContent, Icon, title, onClick }) {
    return (
        <div onClick={onClick} className="headerOption">
            {Icon && <Icon className="headerOption__icon" />}
            {(avatar || avatarContent) && <Avatar className="headerOption__icon" src={avatar}>{avatarContent}</Avatar>}
            <h3 className="headerOption__title">{title}</h3>
        </div>
    )
}

export default HeaderOption;
