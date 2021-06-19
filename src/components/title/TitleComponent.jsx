import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TitleComponent = ({ title, back, isBack }) => {
	return (
		<div className="d-flex justify-content-start flex-wrap flex-md-nowrap
						align-items-center pb-2 mb-3">
			{ isBack && ( <FontAwesomeIcon icon="arrow-circle-left" onClick={ () => back() } className="mr-4 fa-2x point" /> ) }
			<h2 className="font-italic">{ title }</h2>
		</div>
	);
}

TitleComponent.propTypes = {
	title: PropTypes.string.isRequired
};
