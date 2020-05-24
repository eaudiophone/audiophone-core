import React from 'react';

export const NotFoundPage = () =>  (
	
	<div>
		<h2 className="m-3">Página no encontrada (404)</h2>
		<div className="m-3">
			<p className="text-center">
				Vaya, Parece que estas intentando acceder a una ruta que no existe. 
				Por favor corrige y vuelve a intentarlo.
			</p>
			<div className="d-flex flex-row justify-content-center">
				<a href="/profile">Volver a perfil</a>
			</div>
		</div>	
	</div>
);

export default NotFoundPage;