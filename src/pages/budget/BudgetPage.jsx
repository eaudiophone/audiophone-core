import React, { Component, Fragment } from 'react';
import { BudgetTableComponent, LoadingComponent } from '../../components/index';
import { BudgetService } from '../../services/BudgetService';
import { RedirectService } from '../../services/RedirectService';

export class BudgetPage extends Component {

	budgetService = new BudgetService();

	action = '';
	message = '';

	constructor( props ) {
		super( props );
		
		this.state = { 
			redirect: false, 
			budgets: [],
			totalBudgets: 0,
			showModal: false,
			loading: true,
			showToast: false,
		};
	}

	componentDidMount() {
		return this.getPagination({ start: 1, end: 5 }, true );
	}

	updateBudget( budget ) {
		console.log( 'update', budget );
	}

	deleteBudget( budget ) {
		console.log( 'delete', budget );
	}	

	getPagination( pagination = { start: 1, end: 5 }, init = false ) {
		
		this.budgetService.getAllBudgets( pagination )
			.then( response => {

				console.log( response );

				if ( init ) {
					return this.setState({ ...response, loading: false });
				}

				return this.setState( response );

			})
			.catch( error => {

				if ( error.status === 401 ) {
					this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ loading: false, showToast: true });
			});
	}

	searchBudget( stringSearch = '' ) {
		
		this.budgetService.searchBudget( stringSearch )
			.then( response => {
				return this.setState({ budgets: response.budgets })
			})
			.catch( error => {

				if ( error.status === 401 ) {
					this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ loading: false, showToast: true });
			});
	}

	showPdf() {
		console.log('show pdf');
	}

	dispatchActions( action = '', budget ) {

		if ( action === 'edit' ) {
			this.updateBudget( budget );

		} else if ( action === 'delete' ) {
			this.deleteBudget( budget );

		} else {  // show Pdf
			this.showPdf();

		}
	}

	showContent() {

		if ( !this.state.loading ) {
			return (
				<BudgetTableComponent 
					budgets={ this.state.budgets }
					totalBudgets={ this.state.totalBudgets }
					pagination={ ( params ) => this.getPagination( params ) }
					showPdf={ () => this.showPdf() }
					search={ ( stringSearch ) => this.searchBudget( stringSearch ) }
					dispatch={ ( action, budget ) => this.dispatchActions( action, budget ) }
				/>
			);
		}

		return ( <LoadingComponent /> );
	}

	render() {
		return (
			<Fragment>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
					<h2>Presupuesto de servicios</h2>
				</div>
				{ this.showContent() }
			</Fragment>
		);
	}
}