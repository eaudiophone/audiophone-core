import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const FormTermsRecords = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		values,
		errors,
	} = props;

	return (

		<Form noValidate className="m-3" onSubmit={ handleSubmit }>
			<Form.Row>
				<InputNumber 
					columnSize={ 6 }
					title="Cantidad de citas por semana:"
					name="quantityMeetingWeekly"
					value={ values.quantityMeetingWeekly }
					error={ errors.quantityMeetingWeekly }
					change={ handleChange }
				/>
				<InputNumber 
					columnSize={ 6 }
					title="Cantidad de citas al mes:"
					name="quantityMeetingMonthly"
					value={ values.quantityMeetingMonthly }
					error={ errors.quantityMeetingMonthly }
					change={ handleChange }
				/>
        <InputSelect 
          columnSize={ 12 }
          title="Rango de citas"
          name="daysMeeting"
          value={ values.daysMeeting }
          error={ errors.daysMeeting }
          change={ handleChange }
        />
        <InputHour 
          columnSize={ 6 }
          title="Hora de inicio"
          name="beginTime"
          value={ values.beginTime }
          error={ errors.beginTime }
          change={ handleChange }
        />
        <InputHour 
          columnSize={ 6 }
          title="Hora final"
          name="finalHour"
          value={ values.finalHour }
          error={ errors.finalHour }
          change={ handleChange }
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