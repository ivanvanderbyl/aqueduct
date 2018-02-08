import { Aqueduct } from '../generated/aqueduct';

(async () => {
  // required
  Aqueduct.Initialize({
    host: 'api.ercdex.com'
  });

  const subscription = new Aqueduct.Events.AccountNotification().subscribe({
    account: 'XXXX'
  }, data => {
    console.log(data);
  });

  // later
  subscription.unsubscribe();
})();
