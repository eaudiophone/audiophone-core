import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Formik } from 'formik';
import FormTermsComponent from '../../components/form/terms-form/FormsTermsComponent';
import TermsSchema from '../../components/form/terms-form/TermsSchema';
import Terms from '../../models/TermsModels';
import { DayService } from '../../services/DayService';
import { verifyRangeHours } from '../../util-functions/date-format';
import { ToastComponent } from '../../components/toasts/ToastComponent';

class DayPage extends Component {

	dayService = new DayService();
	message = '';
	action = '';
	tabSelected = '#nav-records';

	TERMS = {
		RENTAL: 1,
		RECORD: 2
	}

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
				
				// console.log( resp ); 

				if ( idTerms === this.TERMS.RECORD ) {
					this.tabSelected = '#nav-records';
				
				} else {
					this.tabSelected = '#nav-rental'

				}

				this.setState({ loading: false })
			})
			.catch( error => {

				this.message = error.message;
				this.action = 'Error';
				this.setState({ showToast: true });
			});
	}

	getDataForm( values, actions ) {
		
		actions.setSubmitting( false );

		const { apiaudiophoneterms_begintime, apiaudiophoneterms_finaltime } = values;
		const { ok, message } = verifyRangeHours( apiaudiophoneterms_begintime, apiaudiophoneterms_finaltime );

		if ( !ok && this.tabSelected === '#nav-records' ) {
		
			this.message = message;
			this.action = 'Error'; 
			
			return this.setState({ showToast: true });
		}

		values = this.dayService.validateTerms( values );

		console.log( values );

		/*this.dayService.createTerms( values )
			.then( resp => {
				
				this.message = resp.message;
				this.action = 'Exito';

				return this.setState({ showToast: true });

			})
			.catch( error => console.error( error ) );*/

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
					component={ FormTermsComponent.FormTermsRecords }
					validateOnChange={ false }
					onSubmit={ this.getDataForm }
					validationSchema={ new TermsSchema().getSchema() }
					initialValues={ new Terms() }
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
					component={ FormTermsComponent.FormTermsRental }
					validateOnChange={ false }
					onSubmit={ this.getDataForm }
					validationSchema={ new TermsSchema().getSchema() }
					initialValues={ new Terms() }
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

		return (
			<div className="d-flex justify-content-center align-items-center flex-row">
				<i className="fas fa-spinner fa-spin fa-2x"></i>
			</div>
		);
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