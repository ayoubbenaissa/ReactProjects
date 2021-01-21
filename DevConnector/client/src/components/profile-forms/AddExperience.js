import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    const [toDateDisabled, toggleDateDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onFieldChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <>
        <h1 className="large text-primary">
        Add An Experience
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => {
            e.preventDefault();
            addExperience(formData, history);  
        }}>
            <div className="form-group">
            <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => onFieldChange(e)} required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onFieldChange(e)} required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={e => onFieldChange(e)} />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={e => onFieldChange(e)} />
            </div>
            <div className="form-group">
            <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                e.preventDefault();
                setFormData({ ...formData, current: !current });
                toggleDateDisabled(!toDateDisabled);
            }} /> {' '}Current Job</p>
            </div>
            <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={e => onFieldChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
            </div>
            <div className="form-group">
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description} onChange={e => onFieldChange(e)}
            ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
        </>
    );
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));