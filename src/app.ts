import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './module/user/user.router';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter)



const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
