// aqui se realizan todas las peticiones al API:
import { URL_SERVER, CLIENT_SECRET } from './../enviroment';
import axios from 'axios';

class BackendService {

	constructor() {
		
		this.token = sessionStorage.getItem('token') || '';

		this.request = {
			baseURL: URL_SERVER.enviroment,
			responseType: 'json',
		};
	}

	async getClient( apiUrl ) {
		
		this.request = {
			...this.request,
			method: 'GET',
			url: apiUrl,
		};

		return await axios( this.request );
	}

	async postClient( apiUrl, data = null ) {

		this.request = {
 			...this.request,
			method: 'POST',
			url: apiUrl,
			data: data !== null ? data : null,
			headers: { 
				authorization: 'Bearer ' + this.token
			}
		};
		
		return await axios( this.request );

	
	}

	async putClient( apiUrl, data ) {
		
		this.request = {
			...this.request,
			method: 'PUT',
			url: apiUrl,
			data,
		}

		return await axios( this.request );
	}

	async deleteClient( apiUrl ) {
		
		this.request = {
			...this.request,
			method: 'DELETE',
			url: apiUrl,		
		};

		return await axios( this.request );
	}

	async logIn( apiUrl, data ) {

		this.request = {
			...this.request,
			method: 'POST',
			url: apiUrl,
			data: {
				...data,
				...CLIENT_SECRET
			}
		}

		return await axios( this.request );
	}
}

export default BackendService;