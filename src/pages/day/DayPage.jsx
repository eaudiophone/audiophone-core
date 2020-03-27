import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Formik } from 'formik';
import FormTermsComponent from '../../components/form/terms-form/FormsTermsComponent';
import TermsSchema from '../../components/form/terms-form/TermsSchema';
import Terms from '../../models/TermsModels';

class DayPage extends Component {

	getHeader() {

		return (
			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
				<h2>Dias de servicios</h2>	
			</div>
		);
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
				className="tab-pane fade show active"
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
				className="tab-pane fade"
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
		console.log( values );
		actions.setSubmitting( false );
	}

	render() {
		
		return (
			<div>
				{ this.getHeader() }
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