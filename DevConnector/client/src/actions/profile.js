import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS, NO_REPOS } from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        // try to get profile via backend call:
        const res = await axios.get('/api/profile/me');
        // if success:
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log(' *** PROFILE_ERROR *** ');
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        // try to get profile via backend call:
        const res = await axios.get('/api/profile');
        // if success:
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getProfileById = userId => async dispatch => {
    try {
        console.log(' *** DOING getProfileById ***');
        // try to get profile via backend call:
        const res = await axios.get(`/api/profile/user/${userId}`);
        // if success:
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try {
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        };
      const res = await axios.get(`/api/profile/github/${username}`, config);
  
      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NO_REPOS
      });
    }
  };

// create/update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        // if profile is created => redirect to dashboard:
        if (!edit) history.push('/dashboard');
    } catch (err) {
        console.log('*** test err *** ', err);
        // see if there are validation erros:
        const errors = err.response.data.errors;
        if (errors && errors.length) errors.forEach(error => dispatch(setAlert(error.msg || error.message, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// ADD experience:
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        console.log('update profile ', res);
        dispatch(setAlert('Experience added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        console.log('*** test err *** ', err);
        // see if there are validation erros:
        const errors = err.response.data.errors;
        if (errors && errors.length) errors.forEach(error => dispatch(setAlert(error.msg || error.message, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// ADD education:
export const addEducation = (formData, history) => async dispatch => {
    try {
        console.log(' ** formData ** ', formData);
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        console.log('update profile ', res);
        dispatch(setAlert('education added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        console.log('*** test err *** ', err);
        // see if there are validation erros:
        const errors = err.response.data.errors;
        if (errors && errors.length) errors.forEach(error => dispatch(setAlert(error.msg || error.message, 'danger')));
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// DELETE experience:
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('experience removed', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// DELETE education:
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('education removed', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// DELETE account (& remove profile)
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? this can NOT be undone!')) {
        try {
            await axios.delete('/api/profile');
            
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been deleted'));

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};
