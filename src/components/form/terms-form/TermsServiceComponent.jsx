import React from 'react';
import { Form, Col, Button } from 'react-booststrap';

const FormTermsRecords = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		values,
		errors,
	} = props;

	return (

		<Form noValidate onSubmit={ handleSubmit }>
			<Form.Row>
				<InputNumber 
					columnSize={ 6 }
					title="Cantdad de citas por semana:"
					name="quantityMeetingWeekly"
					value={ values.quantityMeetingWeekly }
					error={ errors.quantityMeetingWeekly }
					onChange={ handleChange }
				/>
				<InputNumber 
					columnSize={ 6 }
					title="Cantidad de citas al mes:"
					name="quantityMeetingMonthly"
					value={ values.quantityMeetingMonthly }
					error={ errors.quantityMeetingMonthly }
					onChange={ handleChange }
				/>
			</Form.Row>
			<Buttons reset={ handleReset } />
		</Form>
	);
};

const InputNumber = ({ columnSize, title, name, value, change, error }) => (

	<Col sm={ columnSize }>
		<Form.Group>
			<Form.Label>{ title }</Form.Label>
			<Form.Control 
				as="input"
				name={ name }
				value={ value }
				onChange={ change }
				isInvalid={ !!error }
				type="number"
			/> 
			<Form.Control.Feedback type="invalid">
				{ error }
			</Form.Control.Feedback>
		</Form.Group>
	</Col>
);

const InputSelect = ({ title, name, value, change, columnSize, error }) => (

  <Col sm={ columnSize }>
   <Form.Group>
     <Form.Label>{ title }</Form.Label>
     <Form.Control
      as="select"
      name={ name }
      value={ value }
      onChange={ change }
      isInvalid={ !!error }
    >
      <option value="">Seleccione</option>
      <option value="all-days">Toda la semana</option>
      <option value="5-days">Lunes a viernes</option>
      <option value="range">Especificar días</option>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
      { error }
    </Form.Control.Feedback>
   </Form.Group>
  </Col>
);

const InputHour = ({ title, name, value, change, columnSize, error }) => (
    
  <Col sm={ columnSize }>
   <Form.Group>
     <Form.Label>{ title }</Form.Label>
     <Form.Control 
       type="time"
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
	FormTermsRecords
};