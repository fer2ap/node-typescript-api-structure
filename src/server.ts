import bodyParser from 'body-parser';
import express from 'express';
import { connect } from './database';
import { createDummyData } from './scripts/createDummyData';

(
  async () => {
    const app: express.Application = express();
    const port = 3000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    await connect();
    app.get('/', (request, response) => {
      return response.json({ message: 'Welcome to my nemo api' });
    });
    app.get('/createDummyData', (request, response) => {
      createDummyData();
      return response.json({ message: 'Dummy data created' });
    });

    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  }
)();
