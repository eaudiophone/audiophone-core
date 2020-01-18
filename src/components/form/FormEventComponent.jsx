import React, { Component } from 'react';
import Event from './../../models/EventModels';
import { Form, Row, Col, Button } from 'react-bootstrap'; 

class FormEventComponent extends Component {

  constructor( props ) {

    super( props );

    this.state = new Event();

    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  handleSubmit( event ) {

  	const meeting = new Event(
        this.state.title,
        this.state.date,
        this.state.startingTime,
        this.state.finalHour,
        parseInt( this.state.totalHours ),
        this.state.addressMeeting === '' ? 'Estudio principal' : this.state.addressMeeting,
        this.state.description,
        this.props.idService
    );
  
  	this.resetForm();

  	console.log( meeting );

    alert( 'formulario enviado' );

    event.preventDefault();

    this.props.callback();
  }

  handleChange( event ) {

    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [ name ]: value });
  } 

  resetForm() {
        
    this.setState( new Event() );
  }

  getForm( name, title, state, columnSize ) {

    return (

	    <Col sm={ columnSize }>
	       <Form.Group>
	         <Form.Label>{ title }</Form.Label>
	         <Form.Control 
	           type="text"
	           name={ name }
	           value={ state }
	           onChange={ this.handleChange }
	        />
	       </Form.Group>
	    </Col>
   
    );
  }

  getFormDate( name, title, state, columnSize ) {

  	return (

  		 <Col sm={ columnSize }>
	       <Form.Group>
	         <Form.Label>{ title }</Form.Label>
	         <Form.Control 
	           type="date"
	           name={ name }
	           value={ state }
	           onChange={ this.handleChange }
	        />
	       </Form.Group>
	    </Col>
  	);
  }

  getFormTextarea( name, title, state, columnSize ) {

  	return (

  		<Col sm={ columnSize }>
	       <Form.Group>
	         <Form.Label>{ title }</Form.Label>
	         <Form.Control
	         	as="textarea"
	          name={ name }
	          value={ state }
	          onChange={ this.handleChange }
	        />
	       </Form.Group>
	    </Col>
  	);
  }

  render() {

  	return(

    	<Form onSubmit={ this.handleSubmit }>
    		<Row>
    			{ this.getForm( 'title', 'Titulo del evento', this.state.title, 12 ) }
    			{ this.getFormDate( 'date', 'Fecha', this.state.date, 12 ) }
    			{ this.getForm( 'startingTime', 'Hora de inicio', this.state.startingTime, 4 ) }
        	{ this.getForm( 'finalHour', 'Hora final', this.state.finalHour, 4 ) }
        	{ this.getForm( 'totalHours', 'Total horas', this.state.totalHours, 4 ) }
          {
            this.props.idService === 2 &&  

              this.getFormTextarea( 
                 'addressMeeting', 
                 'Direccion del evento', 
                 this.state.addressMeeting,
                 12 
              ) 
          }
        	{ this.getFormTextarea( 'description', 'Descripción', this.state.description, 12 ) }
    		</Row>

        	<Button type="submit" variant="primary" className="mr-3">
        		Enviar
        	</Button>
        	<Button type="reset" onClick={ this.resetForm } variant="secondary">
        		Cancelar
        	</Button>
    	</Form>
  	);

  }
}

export default FormEventComponent;