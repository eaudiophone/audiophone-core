import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LoadingComponent = () => (
	<div className="d-flex justify-content-center align-items-center flex-row">
		<FontAwesomeIcon icon="spinner" spin size="2x" />
	</div>
); 