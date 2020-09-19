import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';
import { DAYSWEEK } from './../../../hardcode/WeekHardcode';

const FormTermsRental = ({ handleSubmit, handleChange, handleReset, values, errors, }) => {

  console.log( values );

  return (

    <Form noValidate className="m-3" onSubmit={ handleSubmit }>
      <Form.Row>
        <InputNumber 
          columnSize={ 6 }
          title="Cantidad de alquileres por semana:"
          name="apiaudiophoneterms_quantityeventsweekly"
          value={ values.apiaudiophoneterms_quantityeventsweekly }
          error={ errors.apiaudiophoneterms_quantityeventsweekly }
          change={ handleChange }
        />
        <InputNumber 
          columnSize={ 6 }
          title="Cantidad de alquileres al mes:"
          name="apiaudiophoneterms_quantityeventsmonthly"
          value={ values.apiaudiophoneterms_quantityeventsmonthly }
          error={ errors.apiaudiophoneterms_quantityeventsmonthly }
          change={ handleChange }
        />
         <InputSelect 
          columnSize={ 12 }
          title="Rango de citas:"
          name="apiaudiophoneterms_rankevents"
          value={ values.apiaudiophoneterms_rankevents }
          error={ errors.apiaudiophoneterms_rankevents }
          change={ handleChange }
        />
         { values.apiaudiophoneterms_rankevents === 'range' && 

          <CheckboxDays 
            columnSize={ 6 }
            title="días de semana"
            name="apiaudiophoneterms_daysevents"
            value={ values.apiaudiophoneterms_daysevents }
            change={ handleChange } 
            start={ 0 }
            limit={ 3 }
          />  
        }
        { values.apiaudiophoneterms_rankevents === 'range' &&  

          <CheckboxDays 
            columnSize={ 6 }
            title="días de semana"
            name="apiaudiophoneterms_daysevents"
            value={ values.apiaudiophoneterms_daysevents }
            change={ handleChange } 
            start={ 4 }
            limit={ 6 }
          />
        }
        <InputHour 
          columnSize={ 6 }
          title="Hora de inicio:"
          name="apiaudiophoneterms_begintime"
          value={ values.apiaudiophoneterms_begintime }
          error={ errors.apiaudiophoneterms_begintime }
          change={ handleChange }
        />
        <InputHour 
          columnSize={ 6 }
          title="Hora de culminación:"
          name="apiaudiophoneterms_finaltime"
          value={ values.apiaudiophoneterms_finaltime }
          error={ errors.apiaudiophoneterms_finaltime }
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
				name="apiaudiophoneterms_quantityeventsweekly"
				value={ values.apiaudiophoneterms_quantityeventsweekly }
				error={ errors.apiaudiophoneterms_quantityeventsweekly }
				change={ handleChange }
			/>
			<InputNumber 
				columnSize={ 6 }
				title="Cantidad de grabaciones al mes:"
				name="apiaudiophoneterms_quantityeventsmonthly"
				value={ values.apiaudiophoneterms_quantityeventsmonthly }
				error={ errors.apiaudiophoneterms_quantityeventsmonthly }
				change={ handleChange }
			/>
      <InputSelect 
        columnSize={ 12 }
        title="Rango de citas:"
        name="apiaudiophoneterms_rankevents"
        value={ values.apiaudiophoneterms_rankevents }
        error={ errors.apiaudiophoneterms_rankevents }
        change={ handleChange }
      />
      { values.apiaudiophoneterms_rankevents === 'range' && 

        <CheckboxDays 
          columnSize={ 6 }
          name="apiaudiophoneterms_daysevents"
          value={ values.apiaudiophoneterms_daysevents }
          change={ handleChange } 
          start={ 0 }
          limit={ 3 }
        />  
      }
      { values.apiaudiophoneterms_rankevents === 'range' &&  

        <CheckboxDays 
          columnSize={ 6 }
          name="apiaudiophoneterms_daysevents"
          value={ values.apiaudiophoneterms_daysevents }
          change={ handleChange } 
          start={ 4 }
          limit={ 6 }
        />
      }
      <InputHour 
        columnSize={ 6 }
        title="Hora de inicio:"
        name="apiaudiophoneterms_begintime"
        value={ values.apiaudiophoneterms_begintime }
        error={ errors.apiaudiophoneterms_begintime }
        change={ handleChange }
      />
      <InputHour 
        columnSize={ 6 }
        title="Hora de culminación:"
        name="apiaudiophoneterms_finaltime"
        value={ values.apiaudiophoneterms_finaltime }
        error={ errors.apiaudiophoneterms_finaltime }
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
  error: PropTypes.string,
  max: PropTypes.string
};

const CheckboxDays = ({ name, value, change, columnSize, error, start, limit }) => {

  // let prueba = [];

 /* value.forEach(( element ) => {
    prueba.push( DAYSWEEK.filter( day => day.name === element ));
  });*/

  const renderWeek = () => {

    let checks = [];

    for ( let i = start; i <= limit; i++ ) {
      
      checks.push(
        
        <Form.Check
          key={ DAYSWEEK[i].id } 
          name={ name }
          label={ DAYSWEEK[i].name }
          type="checkbox"
          value={ DAYSWEEK[i].id }
          onChange={ change }
          id={ DAYSWEEK[i].id }
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