// this is the env file
const environmentDev = true;

export const URL_SERVER = {
  enviroment: environmentDev ? 'http://localhost:8000/api/' : 'https://eaudiophone.com',
  documents: environmentDev ? 'http://localhost:8000/' : 'https//eaudiophone.com'
};

export const CLIENT_SECRET = {
  	grant_type: "password",
  	client_id: "2",
  	client_secret: "jkQw27gTEOsllRXVszOnc6aPZAdruewI1TKu0v9v",
  	scope: ""
};
