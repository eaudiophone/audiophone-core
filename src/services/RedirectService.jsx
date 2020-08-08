import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const RedirectService = ({ route }) => ( <Redirect to={ route } /> );

RedirectService.propTypes = {
	route: PropTypes.string.isRequired
};

export default RedirectService;