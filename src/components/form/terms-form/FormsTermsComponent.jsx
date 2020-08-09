import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';

const FormTermsRental = ({ handleSubmit, handleChange, handleReset, values, errors, }) => {

  return (

    <Form noValidate className="m-3" onSubmit={ handleSubmit }>
      <Form.Row>
        <InputNumber 
          columnSize={ 6 }
          title="Cantidad de alquileres por semana:"
          name="quantityMeetingWeekly"
          value={ values.quantityMeetingWeekly }
          error={ errors.quantityMeetingWeekly }
          change={ handleChange }
        />
        <InputNumber 
          columnSize={ 6 }
          title="Cantidad de alquileres al mes:"
          name="quantityMeetingMonthly"
          value={ values.quantityMeetingMonthly }
          error={ errors.quantityMeetingMonthly }
          change={ handleChange }
        />
         <InputSelect 
          columnSize={ 12 }
          title="Rango de citas:"
          name="daysMeeting"
          value={ values.daysMeeting }
          error={ errors.daysMeeting }
          change={ handleChange }
        />
         { values.daysMeeting === 'range' && 

          <CheckboxDays 
            columnSize={ 6 }
            title="días de semana"
            name="daysWeek"
            value={ values.daysWeek }
            change={ handleChange } 
            start={ 0 }
            limit={ 3 }
          />  
        }
        { values.daysMeeting === 'range' &&  

          <CheckboxDays 
            columnSize={ 6 }
            title="días de semana"
            name="daysWeek"
            value={ values.daysWeek }
            change={ handleChange } 
            start={ 4 }
            limit={ 6 }
          />
        }
        <InputHour 
          columnSize={ 6 }
          title="Hora de inicio:"
          name="beginTime"
          value={ values.beginTime }
          error={ errors.beginTime }
          change={ handleChange }
        />
        <InputHour 
          columnSize={ 6 }
          title="Hora de culminación:"
          name="finalHour"
          value={ values.finalHour }
          error={ errors.finalHour }
          change={ handleChange }
        />
      </Form.Row>
      <Buttons reset={ handleReset } />
    </Form>
  );
}

const FormTermsRecords = ({ handleSubmit, handleChange, handleReset, values, errors, }) => (

	<Form noValidate className="m-3" onSubmit={ handleSubmit }>
		<Form.Row>
			<InputNumber 
				columnSize={ 6 }
				title="Cantidad de grabaciones por semana:"
				name="quantityMeetingWeekly"
				value={ values.quantityMeetingWeekly }
				error={ errors.quantityMeetingWeekly }
				change={ handleChange }
			/>
			<InputNumber 
				columnSize={ 6 }
				title="Cantidad de grabaciones al mes:"
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
      { values.daysMeeting === 'range' && 

        <CheckboxDays 
          columnSize={ 6 }
          name="daysWeek"
          value={ values.daysWeek }
          change={ handleChange } 
          start={ 0 }
          limit={ 3 }
        />  
      }
      { values.daysMeeting === 'range' &&  

        <CheckboxDays 
          columnSize={ 6 }
          name="daysWeek"
          value={ values.daysWeek }
          change={ handleChange } 
          start={ 4 }
          limit={ 6 }
        />
      }
      <InputHour 
        columnSize={ 6 }
        title="Hora de inicio:"
        name="beginTime"
        value={ values.beginTime }
        error={ errors.beginTime }
        change={ handleChange }
      />
      <InputHour 
        columnSize={ 6 }
        title="Hora de culminación"
        name="finalHour"
        value={ values.finalHour }
        error={ errors.finalHour }
        change={ handleChange }
      />
		</Form.Row>
		<Buttons reset={ handleReset } />
	</Form>
);

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
        min="1"
			/> 
			<Form.Control.Feedback type="invalid">
				{ error }
			</Form.Control.Feedback>
		</Form.Group>
	</Col>
);

InputNumber.propTypes = {
  columnSize: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  error: PropTypes.string
}

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

InputSelect.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  columnSize: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  error: PropTypes.string
};

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

InputHour.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  columnSize: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  error: PropTypes.string
};

const CheckboxDays = ({ name, value, change, columnSize, error, start, limit }) => {

  const DAYSWEEK = [
   'lunes', 
   'martes', 
   'miercoles', 
   'jueves',
   'viernes',
   'sábado',
   'domingo'
  ];

  const renderWeek = () => {

    let checks = [];

    for ( let i = start; i <= limit; i++ ) {
      
      checks.push(
        
        <Form.Check
          key={ i } 
          name={ name }
          label={ DAYSWEEK[i] }
          type="checkbox"
          value={ DAYSWEEK[i] }
          onChange={ change }
          id={ DAYSWEEK[i] }
        />
      );          
    }

    return checks;
  } 

  return (

    <Col sm={ columnSize } className="mb-2">
      { renderWeek() }
    </Col>
  );
}

CheckboxDays.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array,
  change: PropTypes.func.isRequired,
  columnSize: PropTypes.number.isRequired,
  error: PropTypes.string,
  start: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired
};

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

Buttons.propTypes = {
  reset: PropTypes.func.isRequired
};

export default {
	FormTermsRecords,
  FormTermsRental
};