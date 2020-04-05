import React from "react";
import { Form, Col, Button } from "react-bootstrap";

const FormProfileComponent = ( props ) => {
  
  const { handleSubmit, handleChange, handleReset, values, errors } = props;

  return (
    <Form className="form" onSubmit={ handleSubmit } noValidate>
      <FormInput
        title="Nombre:"
        name="audiophoneusers_fullname"
        value={ values.audiophoneusers_fullname }
        error={ errors.audiophoneusers_fullname }
        change={ handleChange }
      />
      <FormInput
        title="Email:"
        name="audiophoneusers_email"
        value={ values.audiophoneusers_email }
        error={ errors.audiophoneusers_email }
        change={ handleChange }
      />
      <FormPassword
        title="Contraseña:"
        name="audiophoneusers_password"
        value={ values.audiophoneusers_password }
        error={ errors.audiophoneusers_password }
        change={ handleChange }
      />
      <FormButtons reset={ handleReset } />
    </Form>
  );
};

const FormPassword = ({ title, value, change, name, error }) => {

  return (
    <Form.Group>
      <Form.Label className="form-label">{title}</Form.Label>
      <Form.Control
        as="input"
        value={value}
        type="password"
        onChange={change}
        name={name}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

const FormInput = ({  title, value, change, name, error }) => {

  return (
    <Form.Group>
      <Form.Label className="form-label">{title}</Form.Label>
      <Form.Control
        as="input"
        value={value}
        name={name}
        onChange={change}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

const FormInputDate = ({ title, value, change, name, error }) => {
 
  return (
    <Form.Group>
      <Form.Label className="form-label">{title}</Form.Label>
      <Form.Control
        type="date"
        as="input"
        value={value}
        name={name}
        onChange={change}
        isInvalid={!!error}
        readOnly
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>

  );
};

const FormButtons = ({ reset })  => {

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
        <Button block className="button-w80" variant="primary" type="submit">
          Enviar
        </Button>
      </Col>
    </Form.Row>
  );
};

export default {
  FormProfileComponent,
  FormPassword,
  FormButtons,
  FormInput,
  FormInputDate
};
