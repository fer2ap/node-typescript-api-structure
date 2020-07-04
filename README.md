# node-express-mongodb NEMo api
Node.js, ESLint, TypeScript, Jest &amp, Babel + Express, Mongoose

Objetctive:

Rocketseat provided the base repo with the basic structure to run a node app using typescript and node.

However, it is also needed to configure an express app and a local connection to a database to create a functional web app based on this stack.

I hope web developers starting their first learning journey on TypeScript and anyone interested in a using TS for their own Web Services can take benefit from this project.

The main tasks to be done are:

 - Configure an Express app;
 - Implement MongoDB connection;
 - Implement Mongoose with the Types and Interfaces required by Typescript;
 - Authentication for the User Collection using JWT
 - Implement an additional collection, other than User to keep as an exemple.


Running this project locally:

 - Setup: Access to a MongoDB at local or remote;
 - Start your MongoDB
 - run "yarn install"
 - run "yarn dev"
 - Open your localhost
 
 Troubleshooting: 
 
 - If the connection to mongo was done and you have no response at localhost, make sure you are at the correct port.
 You can always change the exposed port on server.ts. 