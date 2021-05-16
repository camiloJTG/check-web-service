import { createConnection, Connection } from 'typeorm';

(async () => {
  try {
    const result: Connection = await createConnection();
    if (result.isConnected) {
      console.log('Database is connected');
    }
  } catch (e) {
    console.error(
      `Could not establish a connection to the database: ${e.message}`
    );
  }
})();
