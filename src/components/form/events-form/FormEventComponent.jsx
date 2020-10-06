import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap'; 
import { Field, Form as FormFormik } from 'formik';

import { 
  NumberInput, 
  SelectInput,
  HourInput,
  FormButtons,
  FormInput,
  FormInputDate
} from '../FormComponent';

const FormEventComponent = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		errors,
		values
	} = props;

	return (

		<FormFormik>

      <Form.Row>
        
        <Field 
          title="Título del evento:"
          name="apiaudiophonevents_title"
          type="text"
          component={ FormInput }
        />

        <Field 
          component={ SelectInput }
          title="Servicio a solicitar:"
          name="id_apiaudiophoneservices"
          options={ getOptions() }
          type="select"
        />

        <Field 
          name="apiaudiophonevents_date"
          title="Fecha del evento:"
          type="date"
          component={ FormInputDate }
        />

        <Field 
          title="Hora de inicio:"
          name="apiaudiophonevents_begintime"
          columnSize={ 4 }
          type="time"
          component={ HourInput }
        />

        <Field 
          title="Hora de finalización:"
          name="apiaudiophonevents_finaltime"
          columnSize={ 4 }
          type="time"
          component={ HourInput }
        />

        <Field 
          columnSize={ 4 }
          title="Total horas:"
          name="apiaudiophonevents_totalhours"
          type="time"
          component={ HourInput }
        />



      </Form.Row>


			{/*<Form.Row>

        { values.idService === '2' &&

          <InputTextarea 
            name="addressMeeting"
            value={ values.addressMeeting }
            error={ errors.addressMeeting }
            title="Direccion del evento:"
            columnSize={ 12 }
            change={ handleChange }
          />
        }

        <InputTextarea 
            name="description"
            value={ values.description }
            error={ errors.description }
            title="Descripción:"
            columnSize={ 12 }
            change={ handleChange }
         />
			</Form.Row>

      <Buttons 
        reset={ handleReset }
      />/*/}
			
		</FormFormik>
	);
}


const getOptions = () => {

  let idServices = [];

  for ( let i = 1; i <= 2; i++ ) {

    if ( i === 1 ) {
      idServices = idServices.concat([{ value: i, description: 'servicio de alquiler ( Grupo Musical Horizonte )' }]);
    
    } else {
      idServices = idServices.concat([{ value: i, description: 'servicio de grabación ( Estudios Audiophone )' }]);
    }
  }

  return idServices;
}




const InputText = ({ columnSize, name, change, value, error, title })  => (
    
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

InputText.propTypes = {
  columnSize: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  error: PropTypes.string,
  title: PropTypes.string.isRequired
};

const InputTextarea = ({ title, name, value, change, columnSize, error }) => (

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

InputTextarea.propTypes = {
  columnSize: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  title: PropTypes.string.isRequired
};

const InputDate = ({ title, name, value, change, columnSize, error }) => (

  <Col sm={ columnSize }>
    <Form.Group>
     <Form.Label>{ title }</Form.Label>
     <Form.Control 
       type="date"
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

InputDate.propTypes = {
  columnSize: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  title: PropTypes.string.isRequired
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
  columnSize: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  title: PropTypes.string.isRequired
};

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
      <option value="1">Grabación</option>
      <option value="2">Alquiler</option>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
      { error }
    </Form.Control.Feedback>
   </Form.Group>
  </Col>
);

InputSelect.propTypes = {
  columnSize: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  title: PropTypes.string.isRequired
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

export default FormEventComponent;