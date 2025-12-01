import express, { Express, Request, Response } from 'express';


const app: Express = express();
const PORT: number = Number(process.env.BACKEND_PORT) || 9000;

if (!PORT) {
    console.error('CRITICAL ERROR: BACKEND_PORT environment variable is not defined.');
    process.exit(1);
}


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});