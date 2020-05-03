import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalRegisters, pagination = 5, send }) => {

	const [ paginationNumber, setPaginationNumber ] = useState( 1 );
	
	let limit = 0;

	const getPagination = () => {

		let items = [];

		for ( let index = 1; index <= limit; index++ ) {

			items.push(

				<Pagination.Item 
					key={ index }
					active={ index === paginationNumber }
					onClick={ () => setUrl( index ) }
				>
					{ index }
				</Pagination.Item>

			);
		}

		return items;
	};

	const setUrl = ( index ) => {

		if ( index < 1 || index > limit ) { return; }
		
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
		<Pagination>
			<Pagination.Prev onClick={ () => setUrl( paginationNumber - 1 ) } />
				{ getPagination() }
			<Pagination.Next onClick={ () => setUrl( paginationNumber + 1 ) } />
		</Pagination>
	);
};

export default PaginationComponent;