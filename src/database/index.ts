import Mongoose from 'mongoose';

let database: Mongoose.Connection;

export const connect = () => {
  const localUri = 'mongodb://localhost:27017/teste';
  if (database) {
    return;
  }
  Mongoose.connect(localUri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  database = Mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
