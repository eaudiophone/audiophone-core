// this is the env file
const environmentDev = false;

export const URL_SERVER = {
  enviroment: environmentDev ? 'http://localhost:8000/api/' : 'http://68.183.125.210/api/',
  documents: environmentDev ? 'http://localhost:8000/' : 'http://68.183.125.210/'
};

export const CLIENT_SECRET = {
  	grant_type: "password",
  	client_id: "2",
  	client_secret: "zggNlWUBxmxse7pC7oDfoUq4Qz4aHk9x9K3po7yl",
  	scope: ""
};
