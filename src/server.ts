import '@controllers/UsersController';
import bodyParser from 'body-parser';
import express from 'express';
import { connect } from './database';

const app: express.Application = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connect()
app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
