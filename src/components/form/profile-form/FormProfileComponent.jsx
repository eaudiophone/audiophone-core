import React from "react";
import { Form, Col, Button } from "react-bootstrap";

const FormProfileComponent = props => {
  const { handleSubmit, handleChange, handleReset, values, errors } = props;

  return (
    <Form className="form" onSubmit={handleSubmit} noValidate>
      <FormInput
        data={{
          title: "Nombre:",
          name: "name",
          value: values.name,
          error: errors.name,
          change: handleChange
        }}
      />
      <FormInput
        data={{
          title: "Email:",
          name: "email",
          value: values.email,
          error: errors.email,
          change: handleChange
        }}
      />
      <FormPassword
        data={{
          title: "Contraseña:",
          name: "password",
          value: values.password,
          error: errors.password,
          change: handleChange
        }}
      />
      <FormButtons data={{ reset: handleReset }} />
    </Form>
  );
};

const FormPassword = props => {
  const { title, value, change, name, error } = props.data;

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

const FormInput = props => {
  const { title, value, change, name, error } = props.data;

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

const FormButtons = props => {
  const reset = props.data.reset;

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
  FormInput
};
