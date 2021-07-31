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
            totalBalances: response.data.count_balance_client,
            balances: response.data.apiaudiophonebalanceshow,
            total: this.calculateBalance( response.data.apiaudiophonebalanceshow )
          });
        })
        .catch(( error ) => reject( this.authService.validateExceptionServer( error ) ));
    });
  }

  createBalanceClient( balance ) {

    return new Promise(( resolve, reject ) => {
      let url = `apiaudiophonebalance/store/${ this.id }`;

      this.authService.postClient( url, balance )
        .then(( response ) => {
          resolve({
            balance: {
              ...response.data.apiaudiophonebalancestore,
              apiaudiophonebalances_debe: response.data.apiaudiophonebalancestore.apiaudiophonebalances_debe.toFixed(2),
              apiaudiophonebalances_haber: response.data.apiaudiophonebalancestore.apiaudiophonebalances_haber.toFixed(2),
              apiaudiophonebalances_total: response.data.apiaudiophonebalancestore.apiaudiophonebalances_total.toFixed(2),
              apiaudiophonebalances_tarif: response.data.apiaudiophonebalancestore.apiaudiophonebalances_tarif.toFixed(2)
            },
            message: response.data.message
          });
        })
        .catch(( error ) => {
          reject( this.authService.validateExceptionServer( error ) );
        })
    });
  }

  searchBalance( search, clientId ) {

    return new Promise(( resolve, reject ) => {
      let url = `apiaudiophonebalance/show/${ this.id }`;
      let body = { stringsearch: search, id_apiaudiophoneclients: clientId };

      this.authService.postClient( url, body )
        .then(( response ) => {
          resolve({
            totalBalances: response.data.count_balance_client,
            balances: response.data.apiaudiophonebalanceshow,
          });
        })
        .catch(( error ) => reject( this.authService.validateExceptionServer( error ) ));
    });
  }

  calculateBalance( balances = [] ) {

    // retorna el total del valor del balance

    let total = balances.reduce(( accum, balance, index ) => {
      return accum += ( balance.apiaudiophonebalances_debe - balance.apiaudiophonebalances_haber )
    }, 0);

    // console.log( total );

    return total;
  }

  updateBalance( balance ) {
    return new Promise(( resolve, reject ) => {
      let url = `apiaudiophonebalance/update/${ this.id }`;

      this.authService.putClient( url, balance )
        .then(( response ) => {
          // console.log( response );
          resolve({
            message: response.data.message,
            ok: true,
            status: 200
          });
        })
        .catch( ( error ) => reject( this.authService.validateExceptionServer( error ) ));
    });
  }

  deleteBalance( balance ) {
    return new Promise(( resolve, reject ) => {
      let url = `apiaudiophonebalance/destroy/${ this.id }`;

      this.authService.deleteClient( url, balance )
        .then(( response ) => {
          resolve({
            message: response.data.apiaudiophonebalance_message,
            ok: true,
            status: 200
          });
        })
        .catch(( error ) => reject( this.authService.validateExceptionServer( error ) ) );
    });
  }

  generateBalance( idClient ) {
    return new Promise(( resolve, reject ) => {
      let url = `apiaudiophonebalance/balancepdf/${ this.id }`;
      let body = { id_apiaudiophoneclients: idClient }

      this.authService.postClient( url, body )
        .then( response => {
          resolve({
            ok: true,
            code: response.data.status,
            message: response.data.apiaudiophonebalancemessage
          });
        })
        .catch( error => reject( this.authService.validateExceptionServer( error ) ) )
    })
  }
}
