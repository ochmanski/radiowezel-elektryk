import {
  connect as mongooseConnect,
  connection as mongooseConnection,
} from 'mongoose';

export default mongooseConnect('mongodb://re-database/main', {
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongooseConnection.on('error', () => {
  console.log('Błąd łączenia z mongoose');
});

mongooseConnection.once('open', () => {
  console.log('Pomyślnie połączono z mongoose');
});
