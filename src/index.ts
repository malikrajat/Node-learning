import Server from './server';
import 'dotenv/config';

export class JobApplication {
  run() {
    console.log('Job application is running');
    const server = new Server(
      process.env.PORT ? parseInt(process.env.PORT) : 5050
    );
    server.start();
  }
}
const job = new JobApplication();
job.run();
