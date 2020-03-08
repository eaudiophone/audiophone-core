import React from 'react';
import { Form, Col, Button } from 'react-bootstrap'; 

const FormEventComponent = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		errors,
		values
	} = props

	return (

		<Form onSubmit={ handleSubmit } noValidate>

			<Form.Row>

        <InputText 
          columnSize={ 12 }
          title="Titulo del evento"
          value={ values.title }
          error={ errors.title }
          name="title"
          change={ handleChange }
        />

        <InputSelect 
          name="idService"
          title="Servicio a solicitar:"
          value={ values.idService }
          error={ errors.idService }
          columnSize={ 12 }
          change={ handleChange }
        />

        <InputDate 
          name="date"
          title="Fecha del evento"
          value={ values.date }
          error={ errors.date }
          columnSize={ 12 }
          change={ handleChange }
        />

        <InputHour 
          title="Hora de inicio:"
          name="startingTime"
          value={ values.startingTime }
          error={ errors.startingTime }
          columnSize={ 4 }
          change={ handleChange }
        />

        <InputHour 
          title="Hora final"
          name="finalHour"
          value={ values.finalHour }
          error={ errors.finalHour }
          columnSize={ 4 }
          change={ handleChange }
        />

        <InputText 
          columnSize={ 4 }
          title="Total horas"
          value={ values.totalHours }
          name="totalHours"
          error={ errors.totalHours }
          change={ handleChange }
        />

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
      />
			
		</Form>
	);
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

export default FormEventComponent;