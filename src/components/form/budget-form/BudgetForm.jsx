import React from 'react';
import { Form } from 'react-bootstrap';
import { Form as FormFormik, Field } from 'formik';

import { FormButtons, FormInput, DecimalNumberInput } from '../FormComponent';

export const BudgetForm = ( props ) => {
	const { handleReset, values, isSubmitting, isValid } = props;

	return (
		<FormFormik>
			<Field />
			<Field />
			<Field />
		</FormFormik>
	);
}