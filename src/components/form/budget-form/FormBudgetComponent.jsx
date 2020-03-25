import React from 'react';
import { Form, Col, Button } from 'react-bootstrap'; 

const InputText = ({ columnSize, title, value, change, name, error }) => (

  <Col sm={ columnSize }>
   <Form.Group>
     <Form.Label>{ title }</Form.Label>
     <Form.Control
       as="input" 
       type="text"
       name={ name }
       value={ value }
       onChange={ change }
       isInvalid={ !!error }
    />
    <Form.Control.Feedback type="invalid">
      { error }
    </Form.Control.Feedback>
   </Form.Group>
  </Col>
);

const InputTextArea = ({ title, name, value, change, columnSize, error }) => (

	<Col sm={ columnSize }>
  	<Form.Group>
    	<Form.Label>{ title }</Form.Label>
    	<Form.Control
	      as="textarea"
	      name={ name }
	      value={ value }
	      onChange={ change }
	      isInvalid={ !!error }
	    />
	  <Form.Control.Feedback type="invalid">
	      { error }
	    </Form.Control.Feedback>
	  </Form.Group>
  </Col>
);

const InputNumber = ({ title, name, value, change, columnSize, error }) => (

	<Col sm={ columnSize }>
   <Form.Group>
     <Form.Label>{ title }</Form.Label>
     <Form.Control
       as="input" 
       type="number"
       name={ name }
       value={ value }
       onChange={ change }
       isInvalid={ !!error }
    />
    <Form.Control.Feedback type="invalid">
      { error }
    </Form.Control.Feedback>
   </Form.Group>
  </Col>
);

const Buttons = ({ reset }) => (
  
  <Form.Row className="mt-5">
    <Col sm={ 6 } className=" d-flex flex-row justify-content-center">
      <Button 
        block 
        type="submit" 
        variant="primary"
        className="button-w80"
      >
        Enviar
      </Button>
    </Col>
    <Col className="d-flex flex-row justify-content-center">
      <Button
        className="button-w80" 
        block 
        type="reset" 
        onClick={ reset } 
        variant="secondary"
      >
        Cancelar
      </Button>
      
    </Col>
  </Form.Row>
);

export default {
	InputText,
	InputTextArea,
	InputNumber,
	Button
};