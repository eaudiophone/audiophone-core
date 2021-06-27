import { AuthService } from './AuthService';

export class BalanceServices {
  constructor() {
    this.authService = new AuthService();
    this.id = this.authService.getLogged().id;
  }

  getBalanceClient( pagination, clientId ) {

    return new Promise(( resolve, reject ) => {
      let url = `apiaudiophonebalance/show/${ this.id }`;
      let body = { id_apiaudiophoneclients: clientId };

      if ( pagination ) {
        body = { ...body, start: pagination.start };
      }

      this.authService.postClient( url, body )
        .then(( response ) => {
          resolve({
            loading: false,
            totalBalances: response.data.bdbalancetotal,
            balances: response.data.apiaudiophonebalanceshow
          });
        })
        .catch(( error ) => reject( this.authService.validateExceptionServer( error ) ));
    });
  }
}
