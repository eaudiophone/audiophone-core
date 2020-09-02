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
	tabSelected = 1;

	constructor( props ) {
		super( props );
		this.state = { showToast: false };
		this.getDataForm = this.getDataForm.bind( this );
	}

	componentDidMount() {
		return this.getTerms();
	}

	getTerms() {
		this.dayService.getTerms()
			.then( resp => console.log( resp ) )
			.catch( error => {
				this.message = error.message;
				this.action = 'Error';
				this.setState({ showToast: true });
			});
	}


	getTabs() {
		
		return (

			<Nav variant="tabs" defaultActiveKey="#nav-records">

				<Nav.Item>
					<Nav.Link
						data-toggle="tab"
						id="nav-records-tab"
						aria-controls="nav-records" 
    				aria-selected="true"
    				href="#nav-records"
    				onSelect={ () => this.tabSelected = 1 } // records
					>
						Grabaciones
					</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link
						data-toggle="tab"
						id="nav-rental-tab"
						aria-controls="nav-records" 
    				aria-selected="false"
    				href="#nav-rental"
    				onSelect={ () => this.tabSelected = 2 } // rental
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
				className="tab-pane show active"
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

	getDataForm( values, actions ) {
		
		actions.setSubmitting( false );

		const { apiaudiophoneterms_begintime, apiaudiophoneterms_finaltime } = values;
		const { ok, message } = verifyRangeHours( apiaudiophoneterms_begintime, apiaudiophoneterms_finaltime );

		if ( !ok && this.tabSelected === 1 ) {
		
			this.message = message;
			this.action = 'Error'; 
			
			return this.setState({ showToast: true });
		}

		values = this.dayService.validateTerms( values );

		this.dayService.createTerms( values )
			.then( resp => {
				
				this.message = resp.message;
				this.action = 'Exito';

				return this.setState({ showToast: true });

			})
			.catch( error => console.error( error ) );

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
				{ this.getTabs() }
				<div className="tab-content">
					{ this.getTabRecord() }
					{ this.getTabRental() }
				</div>
			</div>
		);
	}
}

export default DayPage;