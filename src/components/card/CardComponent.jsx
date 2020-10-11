import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { RedirectService } from './../../services/RedirectService';
import './CardComponent.css';

export const CardComponent = ({ meeting, color, showModal }) => {

	const {
		icon,
		id,
		title,
		date,
		totalHours,
		startingTime,
		finalHour,
		description,
	} = meeting;

	const [ redirect, setRedirect ] = useState( false );

	const redirectTo = () => {

		if ( redirect ) {
			return ( 
				<RedirectService route={ `/event/${ id }` } /> 
			);
		}
	};

	const CardHeader = () => (

		<Row>
			<Col 
				sm={ 12 } 
				className="d-flex justify-content-between flex-row mt-1"
			>
				<i className={ icon }></i>
				<h5 className="card-title">{ title }</h5>
				<i 
					className="fas fa-times pointer" 
					onClick={ () => showModal( id ) }>
				</i>
			</Col>

		</Row>
	);

	const CardBody = () => (

		<div className="container-fluid">
					
				<Row className="d-flex justify-content-between">
					<label className="card-subtitle mb-2 text-muted text-left pt-2">
						Fecha del evento:
					</label>

					<label className="card-subtitle mb-2 text-muted text-left pt-2">
		        { date }
		      </label>
				</Row>

				<Row className="pt-2 d-flex justify-content-center">
			     <h6>
			        <i className="mr-1 fas fa-clock"></i>
			        Total: { totalHours } horas
			    </h6>        
		   	</Row> 

				<Row className="d-flex justify-content-between pt-2">
					<h5>
			      <span className="badge badge-secondary">
			          <i className="mr-1 fas fa-clock"></i>
			          Inicio: { startingTime }
			       </span>
			    </h5>
			    <h5>
			        <span className="badge badge-secondary">
			            <i className="mr-1 fas fa-clock"></i>
			            Cierre: { finalHour }
			        </span>
			    </h5> 
		    </Row>

		    <Row className=" pt-2 text-justify">
		        <p>{ description }</p>       
		    </Row>
		    
		    <Row className="d-flex justify-content-center pt-2">
		      <Button 
		      	variant="dark" 
		      	onClick={ () => setRedirect( true ) }>
		          <i className="fas fa-pen mr-2"></i>
		          Ver detalles
		      </Button>  
		    </Row>

			</div>
	);

	return (

		<div className="col-sm-6 mb-3">
		  
		  { redirectTo() }

		  <Card>
		  	<Card.Header style={{ backgroundColor: color }}>
		  		<CardHeader/>
		  	</Card.Header>
		    <Card.Body>
		    	<CardBody />
		    </Card.Body>
		  </Card>

		</div>
	);
};

CardComponent.propTypes = {
	meeting: PropTypes.shape({
		icon: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		startingTime: PropTypes.string.isRequired,
		totalHours: PropTypes.number.isRequired,
		finalHour: PropTypes.string.isRequired,
		description: PropTypes.string,
		addressMeeting: PropTypes.string.isRequired,
		idService: PropTypes.number.isRequired
	}),
	color: PropTypes.string.isRequired,
	showModal: PropTypes.func.isRequired
};
