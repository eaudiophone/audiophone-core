import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Formik } from 'formik';
import FormTerms from '../../components/form/terms-form/FormsTermsComponent';
import TermsSchema from '../../components/form/terms-form/TermsSchema';
import Terms from '../../models/TermsModels';
import { DayService } from '../../services/DayService';
import { verifyRangeHours } from '../../util-functions/date-format';
import { ToastComponent } from '../../components/toasts/ToastComponent';
import { LoadingComponent } from '../../components/loading/LoadingComponent';

class DayPage extends Component {

	dayService = new DayService();

	message = '';
	action = '';
	tabSelected = '#nav-records';
	
	terms = null;

	TERMS = Object.freeze({
		RENTAL: 1,
		RECORD: 2
	});

	constructor( props ) {

		super( props );
		
		this.state = { 
			showToast: false, 
			loading: false
		};

		this.getDataForm = this.getDataForm.bind( this );
	}

	componentDidMount() {
		return this.getTerms( this.TERMS.RECORD );
	}

	getTerms( idTerms ) {

		this.setState({ loading: true })


		this.dayService.getTerms( idTerms )
			.then( resp => { 
				
				if ( idTerms === this.TERMS.RECORD ) {
					this.tabSelected = '#nav-records';
				
				} else {
					this.tabSelected = '#nav-rental'

				}

				this.terms = resp.data;

				this.setState({ loading: false })
				
				// console.log( this.terms );
			})
			.catch( error => {

				this.message = error.message;
				this.action = 'Error';
				this.setState({ showToast: true });
			});
	}

	getDataForm( values, actions ) {

		const { apiaudiophoneterms_begintime, apiaudiophoneterms_finaltime } = values;
		const { ok, message } = verifyRangeHours( apiaudiophoneterms_begintime, apiaudiophoneterms_finaltime );

		if ( !ok && this.tabSelected === '#nav-records' ) {
		
			this.message = message;
			this.action = 'Error'; 
			
			return this.setState({ showToast: true });
		}

		values = this.dayService.validateTerms( values );

		// foreign key
		values = {
			...values,
			id_apiaudiophoneservices: this.tabSelected === '#nav-records' ? 2 : 1 
		};

		// console.log( values );

		setTimeout(() => {

			this.dayService.createTerms( values )
				.then( resp => {

					// variable que cambia el estado del botón
					actions.setSubmitting( false );
					
					this.message = resp.message;
					this.action = 'Exito';

					return this.setState({ showToast: true });

				})
				.catch( error => {


					actions.setSubmitting( false );

					this.message = error.message;
					this.action = error.action;
					this.setState({ showToast: true })
					console.error( error );
				});
		}, 2000 );

	}

	getTabs() {
		
		return (

			<Nav variant="tabs" defaultActiveKey={ this.tabSelected }>

				<Nav.Item>
					<Nav.Link
						id="nav-records-tab"
    				href="#nav-records"
    				onSelect={ () => this.getTerms( this.TERMS.RECORD ) }
					>
						Grabaciones
					</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link
						id="nav-rental-tab"
    				href="#nav-rental"
    				onSelect={ () => this.getTerms( this.TERMS.RENTAL ) }
					>
						Alquiler
					</Nav.Link>
				</Nav.Item>

			</Nav>
		);
	}

	getTabRecord() {

		return (
			<div 
				className="tab-pane active"
				id="nav-records"
				aria-labelledby="record-tab"
			>
				<Formik 
					component={ FormTerms }
					validateOnChange={ false }
					onSubmit={ this.getDataForm }
					validationSchema={ new TermsSchema().getSchema() }
					initialValues={ this.terms || new Terms() }
				/>
			</div>
		);
	}

	getTabRental() {

		return (

			<div 
				className="tab-pane"
				id="nav-rental"
				aria-labelledby="rental-tab"
			>
				<Formik 
					component={ FormTerms }
					validateOnChange={ false }
					onSubmit={ this.getDataForm }
					validationSchema={ new TermsSchema().getSchema() }
					initialValues={ this.terms || new Terms() }
				/>
			</div>
		);
	}

	showContent() {

		if ( !this.state.loading ) {
			return (
				<div>
					{ this.getTabs() }
					<div className="tab-content">
						{ this.getTabRecord() }
						{ this.getTabRental() }
					</div>
				</div>
			);
		}

		return ( <LoadingComponent /> );
	}

	render() {
		
		return (
			<div>
				<ToastComponent 
					showToast={ this.state.showToast } 
					onHide={ () => this.setState({ showToast: false }) }  
					content={ this.message }
					context={ this.action }
				/>
				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
					<h2>Dias de servicios</h2>	
				</div>
				{ this.showContent() }
			</div>
		);
	}
}

export default DayPage;