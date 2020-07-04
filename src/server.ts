import express from 'express';
import { connect } from './database';
import { createDummyData } from './scripts/createDummyData';
import { usersRouter } from '@models/users/users.router';
import { projectsRouter } from '@models/projects/projects.router';
import hbs from 'nodemailer-express-handlebars';

(
  async () => {
    express.json();
    const app: express.Application = express();
    const port = 3000;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    await connect();
    usersRouter(app);
    app.post('/createDummyData', (request, response) => {
      createDummyData();
      return response.json({ message: 'Dummy data created' });
    });
    app.get('/', (request, response) => {
      return response.json({ message: 'Welcome to my nemo api' });
    });
    projectsRouter(app);
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  }
)();
