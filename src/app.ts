import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './module/bicycle/bicycle.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/bicycles', BicycleRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
