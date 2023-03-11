import 'dotenv/config';
import app from './app';
import { connectToDatabase } from './infra/database/mongo-connection';

const PORT = process.env.PORT || 8000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Running server on port: ${PORT}!`);
    });
  })
  .catch((error: Error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });
