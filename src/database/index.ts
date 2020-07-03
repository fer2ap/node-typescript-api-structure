import Mongoose from 'mongoose';

let database: Mongoose.Connection;

export const connect = async () => {
  const localUri = 'mongodb://127.0.0.1:27017/test';
  if (database) {
    return;
  }
  await Mongoose.connect(localUri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log('MongoDB connected');
  }, () => {
    console.log('MongoDB failled to connect');
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
