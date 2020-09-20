import React from 'react';

import { Form } from "react-bootstrap";

export const EmailInput = ({ field, form, type }) => (

	<Form.Group>
		<Form.Label>email:</Form.Label>
		<Form.Control
     	{ ...field }
      type={ type }
      isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
		/>
    <Form.Control.Feedback type="invalid">
      { form.errors[ field.name ] }
    </Form.Control.Feedback>
	</Form.Group>
);

export const PasswordInput = ({ field, form, type }) => (

	<Form.Group>
    <Form.Label>password:</Form.Label>
		<Form.Control
      { ...field }
			type={ type }
			isInvalid={ form.errors[ field.name ] && form.touched[ field.name ] } 
	   />
    <Form.Control.Feedback type="invalid">
      { form.errors[ field.name ] }
    </Form.Control.Feedback>
  </Form.Group>
);

export const CheckboxInput = ({ field, form, label, type = 'checkbox' }) => {

	return (
    		 
	 <Form.Group>
    <Form.Check
      id={ field.name }
      type={ type }
      label={ label }
      { ...field }
    /> 
   </Form.Group>
)};