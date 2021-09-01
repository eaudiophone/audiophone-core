import React, { useState } from 'react';
import { Pagination, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './PaginationComponent.css';

export const PaginationComponent = ({ totalRegisters, pagination, send }) => {

	// console.log( totalRegisters );

	const [ paginationNumber, setPaginationNumber ] = useState( 1 );

	let limit = 0;

	const setUrl = ( index ) => {

		if ( index < 1 || index > limit ) {
			return;
		}

		let end = index * pagination;
		let start = index > 1 ? end - ( pagination - 1 ): 1;

		setPaginationNumber( index );
		send({ start, end });
	};

	if ( Number.isInteger( totalRegisters / pagination ) ) {

		limit = totalRegisters / pagination;

	} else {

		limit = Math.ceil( totalRegisters / pagination );
	}

	return (
		<>
			<Row className="justify-content-between mb-4 w-100 mr-0">
				<div>Total de registros:  <span className="ml-1">{ totalRegisters }</span></div>
				<div>Pagina <span className="ml-1">{ paginationNumber }</span> de <span className="ml-1">{ limit }</span></div>
			</Row>
			<Row className="justify-content-center">
				<Pagination>
					<Pagination.First onClick={ () => setUrl( 1 ) } />
					<Pagination.Prev onClick={ () => setUrl( paginationNumber - 1 ) } />
						<Pagination.Item
							active={ true }
							onClick={ () => setUrl( paginationNumber ) }
						>
							{ paginationNumber }
						</Pagination.Item>
					<Pagination.Next onClick={ () => setUrl( paginationNumber + 1 ) } />
					<Pagination.Last onClick={ () => setUrl( limit ) } />
				</Pagination>
			</Row>
		</>
	);
};

PaginationComponent.propTypes = {
	totalRegisters: PropTypes.number.isRequired,
	pagination: PropTypes.number.isRequired,
	send: PropTypes.func.isRequired
};
