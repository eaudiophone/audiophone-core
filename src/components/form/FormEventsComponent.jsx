import React, { Component } from 'react';

import { Container, Form, Row, Col } from 'react-bootstrap'; 

class FormEvent extends Component {

  constructor( props ) {

    super( props );

    console.log( props );

    this.state = {
      title: '',
      date: '',
      startingTime: '',
      finalHour: '', 
      totalHours: '',
      description: ''
    }

    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
    this.resetForm = this.resetForm.bind( this );
  }

  getFromControl( name, title, state ) {

    return (

      <Row>
        <Col>
           <Form.Group>
             <Form.Label>{ title }</Form.Label>
             <Form.Control 
               type="text"
               name={ name }
               size="lg"
               value={ state }
               onChange={ this.handleChange }
               required
            />
           </Form.Group>

        </Col>
      </Row>

     
    );
  }

  handleSubmit( event ) {

    console.log( event.target );
    this.props.callback();

    event.preventDefault();
  }

  handleChange( event ) {

    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ 
      [ name ]: value
    });
  } 

  resetForm( event ) {
        
    this.setState({
          title: '',
          date: '',
          startingTime: '',
          finalHour: '', 
          totalHours: '',
          description: ''
      });
    }

  render() {
    
    return (
      
      <Container>
        <Form onSubmit={ this.handleSubmit }>
          { this.getFromControl( 'title', 'Titulo del evento', this.state.title ) }
          { this.getFromControl( 'date', 'Fecha', this.state.date ) }
          { this.getFromControl( 'startingTime', 'Fecha de inicio', this.state.startingTime ) }
          { this.getFromControl( 'finalHour', 'Hora final', this.state.finalHour ) }
          { this.getFromControl( 'totalHours', 'Total horas', this.state.totalHours ) }
          { this.getFromControl( 'description', 'Descripcion', this.state.description ) }
        </Form>  
      </Container>

    );
  }
}

export default FormEvent;