import React from 'react';

const Card = ( props ) => (

	<div className="col-sm-6 mb-3">
		<div 
            className="card" 
            style={{ backgroundColor: props.color }}
         >
			<div className="card-body">
				{ cardBody( props.meeting ) }
			</div>
		</div>
	</div>
);

const cardBody = ( meeting ) => (

	<div className="container-fluid">
			
		<div className="row d-flex justify-content-between">
			<i className={ meeting.icon }></i>
			<h5 className="card-title">{ meeting.title }</h5>
			<i className="fas fa-times pointer"></i>
		</div>

		<div className="row d-flex justify-content-between">

			<label className="card-subtitle mb-2 text-muted text-left pt-2">
				Fecha del evento:
			</label>

			<label className="card-subtitle mb-2 text-muted text-left pt-2">
            	{ meeting.appointmentDate }
            </label>
					
		</div>

		<div className="row pt-2 d-flex justify-content-center">
             <h6>
                <i className="mr-1 fas fa-clock"></i>
                Total: { meeting.totalHours } horas
            </h6>        
        </div> 

		<div className="row d-flex justify-content-between pt-2">

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
        </div>

        <div className="row pt-2 text-justify">
            <p>{ meeting.description }</p>       
        </div>
        
        <div className="row d-flex justify-content-center pt-2">
            <button className="btn btn-info">
                <i className="fas fa-edit"></i>
                Modificar
            </button>  
        </div>

	</div>

);

export default Card;