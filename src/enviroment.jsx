// this is the env file
const environmentDev = false;

export const URL_SERVER = {
  enviroment: environmentDev ? 'http://localhost:8000/api/' : 'http://68.183.125.210/api/',
  documents: environmentDev ? 'http://localhost:8000/' : 'http://68.183.125.210/'
};

export const CLIENT_SECRET = {
  	grant_type: "password",
  	client_id: "2",
  	client_secret: "jkQw27gTEOsllRXVszOnc6aPZAdruewI1TKu0v9v",
  	scope: ""
};
