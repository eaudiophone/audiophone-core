import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const EmailInput = ({ field, form, type }) => {

	return (

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
	)
};

export const PasswordInput = ({ field, form, type }) => (

	<Form.Group>
    <Form.Label>password:</Form.Label>
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

export const FormInput = ({ field, form, type, title }) => {

  return (
    <Form.Group>
      <Form.Label className="form-label">{ title }</Form.Label>
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
};

export const FormInputDate = ({ title, field, type, form }) => {
 
  return (
    <Form.Group>
      <Form.Label className="form-label">{title}</Form.Label>
      <Form.Control
      	{ ...field }   
        isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
      />
      <Form.Control.Feedback type="invalid">
      	{ form.errors[ field.name ] }
      </Form.Control.Feedback>
    </Form.Group>

  );
};

// buttons
export const FormButtons = ({ reset, loading = false, disabled })  => {

  return (
    <Form.Row className="mt-5">
      <Col sm={6} className="d-flex flex-row justify-content-center">
        <Button
          block
          className="button-w80"
          variant="secondary"
          type="reset"
          onClick={reset}
        >
          Cancelar
        </Button>
      </Col>
      <Col sm={6} className="d-flex flex-row justify-content-center">
        { !loading && (
          <Button  block className="button-w80" disabled={ disabled } variant="primary" type="submit">
            Enviar
          </Button>
          ) 
        }

        { loading && (
          <Button  block disabled className="button-w80" variant="primary">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Enviar
          </Button>
          ) 
        }
      </Col>
    </Form.Row>
  );
};

FormButtons.propTypes = {
  reset: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool.isRequired
};