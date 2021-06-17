import React from 'react';
import PropTypes from 'prop-types';

export const TitleComponent = ({ title }) => {
	return (
		<div className="d-flex justify-content-start flex-wrap flex-md-nowrap
						align-items-center pb-2 mb-3">
			<h2 className="font-italic">{ title }</h2>
		</div>
	);
}

TitleComponent.propTypes = {
	title: PropTypes.string.isRequired
};

