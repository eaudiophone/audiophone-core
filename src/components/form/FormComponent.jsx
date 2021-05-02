import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EmailInput = ({ title, field, form, type, readonly = false }) => {

	return (
		<Form.Group className="w-100">
			<Form.Label>{ title || 'Correo:' }</Form.Label>
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

export const PasswordInput = ({ field, form, type, readonly = false }) => (

	<Form.Group className="w-100">
    <Form.Label>Contraseña:</Form.Label>
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

export const CheckboxInput = ({ field, form, label, id = '', type = 'checkbox', value = null }) => {

	return (

	 <Form.Group>
    <Form.Check
      { ...field }
      id={ id.length === 0 ? field.name : id }
      type={ type }
      label={ label }
      value={ value !== null ? value : '' }
    />
   </Form.Group>
)};

export const FormInput = ({ field, form, type, title, readonly = false }) => {

  return (
    <Form.Group className="w-100">
      <Form.Label className="form-label">{ title }</Form.Label>
      <Form.Control
       	{ ...field }
       	type={ type }
        readOnly={ readonly }
        isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
      />
      <Form.Control.Feedback type="invalid">
      	{ form.errors[ field.name ] }
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const FormInputDate = ({ title, field, type, form, readonly = false }) => {

  return (
    <Form.Group className="w-100">
      <Form.Label className="form-label">{title}</Form.Label>
      <Form.Control
      	{ ...field }
        type={ type }
        readOnly={ readonly }
        isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
      />
      <Form.Control.Feedback type="invalid">
      	{ form.errors[ field.name ] }
      </Form.Control.Feedback>
    </Form.Group>

  );
};

export const HourInput = ({ title, field, form, type, columnSize = 12, readonly = false }) => {

  return (
    <Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control
         { ...field }
         type={ type }
         readOnly={ readonly }
         isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
      />
      <Form.Control.Feedback type="invalid">
        { form.errors[ field.name ] }
      </Form.Control.Feedback>
     </Form.Group>
    </Col>
  )
};


export const NumberInput = ({ field, form, type, columnSize = 12, title, readonly = false }) => {

  return (
    <Col sm={ columnSize }>
      <Form.Group>
        <Form.Label>{ title }</Form.Label>
        <Form.Control
          { ...field }
          isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
          type={ type }
          readOnly={ readonly }
          min="1"
        />
        <Form.Control.Feedback type="invalid">
          { form.errors[ field.name ] }
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
   );
}

export const DecimalNumberInput = ({ field, form, type, columnSize = 12, title, readonly = false }) => {

  return (
    <Col sm={ columnSize }>
      <Form.Group>
        <Form.Label>{ title }</Form.Label>
        <Form.Control
          { ...field }
          isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
          type={ type }
          readOnly={ readonly }
          min="1"
          step="0.01"
        />
        <Form.Control.Feedback type="invalid">
          { form.errors[ field.name ] }
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
   );
}

export const SelectInput = ({ title, columnSize = 12, field, form, options = [], readonly = false }) => (

  <Col sm={ columnSize }>
   <Form.Group>
     <Form.Label>{ title }</Form.Label>
     <Form.Control
      as="select"
      { ...field }
      disabled={ readonly }
      isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
    >
      <option value="">Seleccione</option>
      { options.map( ( option, index ) => (
          <option value={ option.value } key={ index }>{ option.description }</option>
        ))
      }
    </Form.Control>
    <Form.Control.Feedback type="invalid">
      { form.errors[ field.name ] }
    </Form.Control.Feedback>
   </Form.Group>
  </Col>
);

export const TextAreaInput = ({ type = 'textarea', form, field, columnSize = 12, title, readonly = false }) => {

  return (
    <Col sm={ columnSize }>
      <Form.Group>
        <Form.Label>{ title }</Form.Label>
        <Form.Control
          { ...field }
          as={ type }
          readOnly={ readonly }
          isInvalid={ form.errors[ field.name ] && ( form.touched[ field.name ] ) }
        />
        <Form.Control.Feedback type="invalid">
          { form.errors[ field.name ] }
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
}

// buttons
export const FormButtons = ({ reset, loading = false, disabled })  => {

  return (
    <Form.Row className="mt-5">
      <Col sm={6} className="d-flex flex-row justify-content-center mb-2 mb-sm-0">
        <Button
          block
          className="button-w80"
          variant="secondary"
          type="reset"
          onClick={reset}
          disabled={ disabled }
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
            <FontAwesomeIcon className="mr-2" icon="spinner" spin />
            Enviar
          </Button>
          )
        }
      </Col>
    </Form.Row>
  );
};

export const FormButtonsLg = ({ reset, loading = false, disabled })  => {

  return (
    <Form.Row className="mt-4">
      <Col sm={12} className="d-flex flex-row justify-content-center mb-2">
        { !loading && (
          <Button size="lg" block className="button-w80" disabled={ disabled } variant="primary" type="submit">
            Enviar
          </Button>
          )
        }

        { loading && (
          <Button  block disabled className="button-w80" variant="primary">
            <FontAwesomeIcon className="mr-2" icon="spinner" spin />
            Enviar
          </Button>
          )
        }
      </Col>
			<Col sm={12} className="d-flex flex-row justify-content-center">
				<Button
					block
					size="lg"
					className="button-w80 mb-sm-0"
					variant="secondary"
					type="reset"
					onClick={reset}
				>
					Cancelar
				</Button>
			</Col>
    </Form.Row>
  );
};

FormButtons.propTypes = {
  reset: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool.isRequired
};
