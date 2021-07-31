import React, { Component, Fragment } from 'react';
import { BudgetTableComponent, LoadingComponent, ToastComponent } from '../../components/index';
import { BudgetService } from '../../services/BudgetService';
import { RedirectService } from '../../services/RedirectService';
import { ModalBudgetComponent } from '../../components/modal/index';
import { URL_SERVER } from './../../enviroment/enviroment';

export class BudgetPage extends Component {

	budgetService = new BudgetService();
	action = '';
	message = '';
	typeModal = '';

	constructor( props ) {
		super( props );

		this.state = {
			redirect: false,
			budgets: [],
			totalBudgets: 0,
			showModal: false,
			loading: true,
			showToast: false,
			budget: {}
		};
	}

	componentDidMount() {
		return this.getPagination({ start: 1, end: 5 }, true );
	}

	updateBudget({ values, actions }) {

		actions.setSubmitting( true );

		const data = {
			...values,
			apiaudiophonebudgets_id_service:
				values.apiaudiophonebudgets_nameservice.toLowerCase() === 'alquiler' ? 1 : 2,
		};

		delete data.created_at;

		Promise.all([
			this.budgetService.updateBudget( data ),
			this.budgetService.updateStatus({
				apiaudiophonebudgets_id: values.apiaudiophonebudgets_id,
				apiaudiophonebudgets_status: values.apiaudiophonebudgets_status
			})
		])
			.then(([ response ]) => {

				actions.setSubmitting( false );

				let budgets = this.state.budgets.map(( budget ) => {

					if ( budget.apiaudiophonebudgets_id === response.updateBudget.apiaudiophonebudgets_id ) {
						return {
							...response.updateBudget,
							apiaudiophonebudgets_status: values.apiaudiophonebudgets_status
						};
					}

					return budget;
				})

				this.message = response.message;
				this.action = response.action;

				return this.setState({
					showModal: false,
					showToast: true,
					budgets
				});
			})
			.catch( error => {

				if ( error.status === 401 ) {
					this.setState({ redirect: true });
				}

				actions.setSubmitting( false );

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, showModal: false });

			});
	}

	deleteBudget( budget ) {

		this.budgetService.deleteBudget({ apiaudiophonebudgets_id: budget.apiaudiophonebudgets_id })
			.then( response => {

				let budgets = this.state.budgets.filter(
					( budgetArray ) => budgetArray.apiaudiophonebudgets_id !== budget.apiaudiophonebudgets_id
				);

				this.message = response.message;
				this.action = response.action;

				return this.setState({
					showModal: false,
					showToast: true,
					budgets,
					totalBudgets: this.state.totalBudgets - 1
				});
			})
			.catch( error => {

				if ( error.status === 401 ) {
					this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, showModal: false });
			});

		return this.setState({ showModal: false });
	}

	getPagination( pagination = { start: 1, end: 5 }, init = false ) {

		this.budgetService.getAllBudgets( pagination )
			.then( response => {

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


	showPdf( url ) {

		url = url.replaceAll( /\\/g, '/');

		window.open(
			( process.env.REACT_APP_ASSETS || URL_SERVER.documents ) + url,
			'_blank'
		);
	}

	openModal( action = '', budget ) {

		if ( action === 'showPdf' ) {
			return this.showPdf();
		}

		this.typeModal = action;

		return this.setState({ showModal: true, budget });
	}

	dispatchActions( response, action ) {

		if ( action === 'edit' && response ) {
			this.updateBudget( response );

		} else if  ( action === 'delete' && response ) {
			this.deleteBudget( response );

		} else {
			this.setState({ showModal: false });
		}

	}

	showContent() {

		if ( !this.state.loading ) {
			return (
				<BudgetTableComponent
					budgets={ this.state.budgets }
					totalBudgets={ this.state.totalBudgets }
					pagination={ ( params ) => this.getPagination( params ) }
					showPdf={ ( url ) => this.showPdf( url ) }
					search={ ( stringSearch ) => this.searchBudget( stringSearch ) }
					dispatch={ ( action, budget ) => this.openModal( action, budget ) }
				/>
			);
		}

		return ( <LoadingComponent /> );
	}

	render() {
		return (
			<Fragment>
				<ToastComponent
					context={ this.action }
					content={ this.message }
					onHide={ () => this.setState({ showToast: false }) }
					showToast={ this.state.showToast }
				/>
				<ModalBudgetComponent
					showModal={ this.state.showModal }
					closeModal={ ( response, action ) => this.dispatchActions( response, action ) }
					budget={ this.state.budget }
					typeModal={ this.typeModal }
				/>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap
						align-items-center pb-2 mb-3">
					<h2 className="font-italic">Presupuesto de servicios</h2>
				</div>
				{ this.showContent() }
			</Fragment>
		);
	}
}
