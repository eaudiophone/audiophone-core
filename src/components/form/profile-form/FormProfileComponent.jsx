import React from "react";
import { Form, Col, Button } from "react-bootstrap";

const FormProfileComponent = ( props ) => {
  
  const { handleSubmit, handleChange, handleReset, values, errors } = props;

  return (
    <Form className="form" onSubmit={ handleSubmit } noValidate>
      <FormInput
        title="Nombre:"
        name="apiaudiophoneusers_fullname"
        value={ values.apiaudiophoneusers_fullname }
        error={ errors.apiaudiophoneusers_fullname }
        change={ handleChange }
      />
      <FormInput
        title="Email:"
        name="apiaudiophoneusers_email"
        value={ values.apiaudiophoneusers_email }
        error={ errors.apiaudiophoneusers_email }
        change={ handleChange }
      />
      <FormPassword
        title="Contraseña:"
        name="apiaudiophoneusers_password"
        value={ values.apiaudiophoneusers_password }
        error={ errors.apiaudiophoneusers_password }
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
