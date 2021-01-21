import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

import ProfileItem from './ProfileItem';

import Spinner from '../layout/Spinner';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    return <>
    {loading ? <Spinner /> : <>
    <div className="large text-primary">Developers</div>
    <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
    </p>
    <div className="profiles">
        {profiles.length > 0 ? (profiles.map(profile => (<ProfileItem key={profile._id} profile={profile}/>))) : (<h4>No profiles found...</h4>)}
    </div>
    </>}
    </>
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
