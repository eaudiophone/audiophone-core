import React, { Component } from 'react';
import Event from './../../models/EventModels';
import { Form, Row, Col, Button } from 'react-bootstrap'; 

class FormEventComponent extends Component {

  constructor( props ) {

    super( props );

    this.state = new Event();

    console.log( this.state );

    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  handleSubmit( event ) {

  	const eventCalendar = new Event(
  			this.state.title,
  			this.state.date,
  			this.state.startingTime,
  			this.state.finalHour,
  			this.state.totalHours,
  			this.state.description,
  			this.state.addressMeeting
  	);

  	this.resetForm();

  	console.log( eventCalendar );

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
	           required
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
	           required
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
    			{ this.getForm( 'startingTime', 'Fecha de inicio', this.state.startingTime, 4 ) }
        	{ this.getForm( 'finalHour', 'Hora final', this.state.finalHour, 4 ) }
        	{ this.getForm( 'totalHours', 'Total horas', this.state.totalHours, 4 ) }
        	{ this.getForm( 'description', 'Descripción', this.state.description, 12 ) }
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