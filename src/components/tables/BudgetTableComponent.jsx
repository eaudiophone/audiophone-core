import  React, { Component, Fragment } from 'react';
// import { Table } from 'react-bootstrap';

export class BudgetTableComponent extends Component {
		
	constructor( props ) {
		super( props );

		this.state = {
			total: 0,
			items: props.items,
		};
	}

	setData() {
	}

	calculatePrice() {
	}

	render() {
		return (
			<Fragment>
				{ this.props.children }
			</Fragment>
		);
	}
}