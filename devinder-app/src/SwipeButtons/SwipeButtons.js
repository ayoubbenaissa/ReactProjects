import React from 'react';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import IconButton from '@material-ui/core/IconButton';

import './SwipeButtons.css'

function SwipeButtons() {
    return (
        <div className="swipeButtons">
            <IconButton className="swipeButtons__repeat pd-3vh">
                <ReplayIcon fontSize="large" style={{ color: '#f5b748' }} />
            </IconButton>
            <IconButton className="swipeButtons__left pd-3vh">
                <CloseIcon fontSize="large" style={{ color: '#ec5e6f' }}/>
            </IconButton>
            <IconButton className="swipeButtons__star pd-3vh">
                <StarRateIcon fontSize="large" style={{ color: '#62b4f9' }} />
            </IconButton>
            <IconButton className="swipeButtons__right pd-3vh">
                <FavoriteIcon fontSize="large" style={{ color: '#76e2b3' }} />
            </IconButton>
            <IconButton className="swipeButtons__lightning pd-3vh">
                <FlashOnIcon fontSize="large" style={{ color: '#915dd1' }} />
            </IconButton>
        </div>
    )
}

export default SwipeButtons;
