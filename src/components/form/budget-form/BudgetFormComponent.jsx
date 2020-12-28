import React, { Fragment } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Form as FormFormik, Formik, Field } from 'formik';

import Budget from './../../../models/BudgetModels';
import { BudgetSchema } from './BudgetSchema';

import { FormInput } from '../FormComponent';

export const BudgetFormComponent = ( props ) => {
	
	const { children, items, addItem, generateBudget } = props;

	return (
		<Fragment>
			<Col xs={ 12 } className="mt-3 p-0">
				<h3 className="mb-3">Datos del cliente</h3>
				<Formik 
					validateOnChange={ true }
					initialValues={ new Budget() }
					validationSchema={ new BudgetSchema().getSchema() }
					onSubmit={ ( values, actions ) => generateBudget({ values, actions }) }
					children={ ( props ) => {
							
							// se pueden inyectar propiedades a los props que incluye
							// formik
							
							const newProps = { ...props, items, addItem, children };
							
							return ( <ClientForm { ...newProps } /> )
						} 
					}
				/>
			</Col>
		</Fragment>
	);
}

const ClientForm = ( props ) => {
	
	const { children, addItem, isValid, items } = props;

	return (
		<FormFormik>
			<Form.Row>
				<Col sm={ 6 } className="p-3">
					<Field 
						component={ FormInput }
						name="apiaudiophonebudgets_client_name"
						type="text"
						title="Nombre del cliente:"
					/>
				</Col>
				<Col sm={ 6 } className="p-3">
					<Field 
						component={ FormInput }
						name="apiaudiophonebudgets_client_email"
						type="text"
						title="Correo del cliente:"
					/>
				</Col>
				<Col sm={ 6 } className="p-3">
					<Field 
						component={ FormInput }
						name="apiaudiophonebudgets_client_phone"
						type="text"
						title="Teléfono del cliente: (opcional)"
					/>
				</Col>
				<Col sm={ 6 } className="p-3">
					<Field 
						component={ FormInput }
						name="apiaudiophonebudgets_client_social"
						type="text"
						title="Red social del cliente: (opcional)"
					/>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col sm={ 12 } className="text-right">
					<Button size="sm" onClick={ addItem } variant="success">
						Añadir aticulo
					</Button>
				</Col>
				{ children }
			</Form.Row>
			<Form.Row className="justify-content-center">
				<Button type="submit" disabled={ !isValid || items.length === 0 }>
					Generar Presupuesto
				</Button>
			</Form.Row>
		</FormFormik>
	);

}

