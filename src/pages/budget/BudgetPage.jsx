import React, { Component, Fragment } from 'react';
import { BudgetTableComponent } from '../../components/index';

export class BudgetPage extends Component {

	
	constructor( props ) {
		super( props );
		
		this.state = { 
			redirect: true, 
			budgets: [],
			totalBudgets: 0,
			showModal: false,
			loading: false
		};
	}

	componentDidMount() {
		
	}

	updateBudget() {

	}

	deleteBudget() {

	}

	getPagination( pagination = { start: 1, end: 5 } ) {
		console.log( pagination );
	}

	searchBudget( stringSearch = '' ) {

	}

	showPdf() {
		console.log('show pdf');
	}

	render() {
		return (
			<Fragment>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
					<h2>Presupuesto de servicios</h2>
				</div>
				<BudgetTableComponent 
					budgets={ this.state.budgets }
					totalBudgets={ this.state.totalBudgets }
					pagination={ ( params ) => this.getPagination( params ) }
					showPdf={ () => this.showPdf() }
					search={ ( stringSearch ) => this.searchBudget( stringSearch ) }
				/>
			</Fragment>
		);
	}
}