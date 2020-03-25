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

export default {
	InputText,
	InputTextArea,
	InputNumber,
	Button
};