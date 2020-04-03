// aqui se realizan todas las peticiones al API:
// import URL_SERVER from './../enviroment';
import axios from 'axios';

class BackendService {

	getClient() {
	}

	postClient( request ) {
		console.log( request );
	}

	putClient() {

	}

	deleteClient() {

	}

	async testData() {

		
		// open whether map

		const options = {
			
			responseType: 'json',
			params: {
				q: 'London',
				appid: '43d7b14f3b197932d2b31ebc383436d4'
			}
		};

		axios.get('https://api.openweathermap.org/data/2.5/weather', options )
			.then( ( response ) => { 

					const { data } = response;
					console.log( data );

			 })
			.catch( ( error ) => { console.log( error ) } );

		/*

		// Ramdom user generator
		const request = {
			responseType: 'json',
			method: 'get'
		}

		axios.get( 'https://randomuser.me/api/', request )
			.then( ( response ) => {
				
				const { results } = response.data;

				console.log( results );
			})
			.catch( ( error ) => {
				console.log( error );
			});

			*/

		// Pokemon API.
		/*
		axios.get( 'https://pokeapi.co/api/v2/pokemon/charizard' )
			.then( ( response ) => { console.log( response ) })
			.catch( ( error ) => { 
				console.log( error );
			});*/
	}
}

export default BackendService;