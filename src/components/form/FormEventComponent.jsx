import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'; 

class FormEventComponent extends Component {

  constructor( props ) {

    super( props );

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


  handleSubmit( event ) {

    console.log( this.state );
    alert( 'formulario enviado' );

    this.resetForm();
    event.preventDefault();
    this.props.callback();
  }

  handleChange( event ) {

    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ 
      [ name ]: value
    });
  } 

  resetForm() {
        
    this.setState({
          title: '',
          date: '',
          startingTime: '',
          finalHour: '', 
          totalHours: '',
          description: ''
      });
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
               value={ state }
               onChange={ this.handleChange }
               required
            />
           </Form.Group>
        </Col>
      </Row>
     
    );
  }

  render() {

  	return(
  	 
      <Form onSubmit={ this.handleSubmit }>
          { this.getFromControl( 'title', 'Titulo del evento', this.state.title ) }
          { this.getFromControl( 'date', 'Fecha', this.state.date ) }
          { this.getFromControl( 'startingTime', 'Fecha de inicio', this.state.startingTime ) }
          { this.getFromControl( 'finalHour', 'Hora final', this.state.finalHour ) }
          { this.getFromControl( 'totalHours', 'Total horas', this.state.totalHours ) }
          { this.getFromControl( 'description', 'Descripcion', this.state.description ) } 

          <Button type="submit" variant="primary">
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