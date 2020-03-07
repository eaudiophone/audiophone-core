import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = () => {

	const setPagination = () => {

		let active = 1;
		let items = [];

		for ( let number = 1; number <= 5; number++ ) {
			items.push(
				<Pagination.Item 
					key={ number }
					active={ number === active }
				>
					{ number }
				</Pagination.Item>
			);
		}

		return items;
	};

	return (

		<Pagination>
			<Pagination.Prev />
				{ setPagination() }
			<Pagination.Next />
		</Pagination>
	);
};

export default PaginationComponent;