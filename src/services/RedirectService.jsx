import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectService = ( props ) => ( <Redirect to={ props.route } /> );

export default RedirectService;