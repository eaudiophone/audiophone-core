// aqui se realizan todas las peticiones al API:
import URL_SERVER from './../enviroment';
import axios from 'axios';

class BackendService {

	request = null;

	async getClient( apiUrl ) {
		
		this.request = {
			method: 'GET',
			url:  URL_SERVER.enviroment + apiUrl,
			responseType: 'json',
		};

		return await axios( this.request );
	}

	async postClient( apiUrl, data ) {

	 this.request = {
			method: 'POST',
			url: URL_SERVER.enviroment + apiUrl,
			data,
			responseType: 'json',
		};
		
		return await axios( this.request );
	}

	async putClient( apiUrl, data ) {
		
		this.request = {
			method: 'PUT',
			url: URL_SERVER.enviroment + apiUrl,
			data,
			responseType: 'json'
		}

		return await axios( this.request );
	}

	async deleteClient( apiUrl ) {
		
		this.request = {
			method: 'DELETE',
			url: URL_SERVER.enviroment + apiUrl,
			responseType: 'json',
		};

		return await axios( this.request );
	}

	async testData() {

		// open whether map

		// console.log( URL_SERVER.enviroment );

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