import { getEnglishFormatDate } from '../util-functions/date-format';

class Balance {
  constructor(
    apiaudiophonebalances_date,
    apiaudiophonebalances_desc,
    apiaudiophonebalances_horlab,
    apiaudiophonebalances_tarif,
    apiaudiophonebalances_debe,
    apiaudiophonebalances_haber,
    apiaudiophonebalances_total
  ) {
    this.apiaudiophonebalances_date = apiaudiophonebalances_date || getEnglishFormatDate();
    this.apiaudiophonebalances_desc = apiaudiophonebalances_desc || '';
    this.apiaudiophonebalances_horlab = apiaudiophonebalances_horlab || 0;
    this.apiaudiophonebalances_tarif = apiaudiophonebalances_tarif || 0;
    this.apiaudiophonebalances_debe = apiaudiophonebalances_debe || 0;
    this.apiaudiophonebalances_haber = apiaudiophonebalances_haber || 0;
    this.apiaudiophonebalances_total = apiaudiophonebalances_total || 0;
  }
}

export default Balance
