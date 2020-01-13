import React from 'react';
import { Card, Row, Button } from 'react-bootstrap';

const CardComponent = ( props ) => (

	<div className="col-sm-6 mb-3">
        <Card style={{ backgroundColor: props.color }}>
            <Card.Body>{ cardBody( props.meeting ) }</Card.Body>
        </Card>
	</div>
);

const cardBody = ( meeting ) => (

	<div className="container-fluid">
			
		<Row className="d-flex justify-content-between">
			<i className={ meeting.icon }></i>
			<h5 className="card-title">{ meeting.title }</h5>
			<i className="fas fa-times pointer"></i>
		</Row>

		<Row className="d-flex justify-content-between">

			<label className="card-subtitle mb-2 text-muted text-left pt-2">
				Fecha del evento:
			</label>

			<label className="card-subtitle mb-2 text-muted text-left pt-2">
            	{ meeting.appointmentDate }
            </label>
					
		</Row>

		<Row className="pt-2 d-flex justify-content-center">
             <h6>
                <i className="mr-1 fas fa-clock"></i>
                Total: { meeting.totalHours } horas
            </h6>        
        </Row> 

		<Row className="d-flex justify-content-between pt-2">

			<h5>
                <span className="badge badge-secondary">
                    <i className="mr-1 fas fa-clock"></i>
                    Inicio: { meeting.startingTime }
                 </span>
           	</h5>

            <h5>
                <span className="badge badge-secondary">
                    <i className="mr-1 fas fa-clock"></i>
                    Cierre: { meeting.finalHour }
                </span>
            </h5> 
        </Row>

        <Row className=" pt-2 text-justify">
            <p>{ meeting.description }</p>       
        </Row>
        
        <Row className="d-flex justify-content-center pt-2">
            <Button variant="info">
                <i className="fas fa-edit"></i>
                Modificar
            </Button>  
        </Row>

	</div>

);

export default CardComponent;