import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './modules/bicycle/bicycle.route';
import { OrderRoutes } from './modules/order/order.routes';


const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
// application
app.use("/api/products", BicycleRoutes);
app.use('/api/orders', OrderRoutes); 
const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", getAController);

export default app;
