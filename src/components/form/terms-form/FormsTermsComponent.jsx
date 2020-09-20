import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

import { Form as FormFormik, Field } from 'formik';

import { 
  NumberInput, 
  SelectInput,
  HourInput,
  CheckboxInput,
  FormButtons
} from '../FormComponent';

import { DAYSWEEK } from './../../../hardcode/WeekHardcode';

const FormTermsRecords = ({ handleSubmit, handleChange, handleReset, values, errors, isValid }) => (

	<FormFormik noValidate className="m-3">
		<Form.Row>

      <Field 
        title="Cantidad de eventos por semana:" 
        columnSize={ 6 } 
        name="apiaudiophoneterms_quantityeventsweekly"  
        component={ NumberInput }
        type="number"
      />

      <Field 
        title="Cantidad de eventos al mes:" 
        columnSize={ 6 } 
        name="apiaudiophoneterms_quantityeventsmonthly"  
        component={ NumberInput }
        type="number"
      />

      <Field 
        title="Rango de eventos:"
        name="apiaudiophoneterms_rankevents"
        component={ SelectInput }
      />

      {/* values.apiaudiophoneterms_rankevents === 'range' && 

        <CheckboxDays 
          columnSize={ 6 }
          name="apiaudiophoneterms_daysevents"
          start={ 0 }
          limit={ 3 }
        />  
      }
      { values.apiaudiophoneterms_rankevents === 'range' &&  

        <CheckboxDays 
          columnSize={ 6 }
          name="apiaudiophoneterms_daysevents"
          start={ 4 }
          limit={ 6 }
        />
      */}
      
      <Field 
        title="Hora de inicio:"
        component={ HourInput }
        type="time"
        name="apiaudiophoneterms_begintime"
        columnSize={ 6 } 
      />

      <Field 
        title="Hora de culminación:"
        component={ HourInput }
        type="time"
        name="apiaudiophoneterms_finaltime"
        columnSize={ 6 } 
      />

		</Form.Row>
    <FormButtons reset={ handleReset } disabled={ !isValid }  />
	</FormFormik>
);

const CheckboxDays = ({ name, columnSize, error, start, limit, value }) => {

  const renderWeek = () => {

    let checks = [];

    for ( let i = start; i <= limit; i++ ) {
      
      /*let found = false;

      value.forEach(( day ) => {
        
        if ( DAYSWEEK[i].name === day ) {
          found = true;
        }
      });*/

      checks.push(
        
        <Field 
          name={ name } 
          label={ DAYSWEEK[i].name }
          value={ DAYSWEEK[i].id }  
          key={ DAYSWEEK[i].id } 
          id={ DAYSWEEK[i].name } 
          component={ CheckboxInput }
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
  columnSize: PropTypes.number.isRequired,
  error: PropTypes.string,
  start: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired
};



export default {
	FormTermsRecords,
  // FormTermsRental
};