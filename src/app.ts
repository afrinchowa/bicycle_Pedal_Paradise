import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './modules/bicycle/bicycle.route';
import { OrderRoutes } from './modules/order/order.routes';


const app: Application = express();

// parser
app.use(express.json());
// app.use(cookieParser());

app.use(cors({origin:'http://localhost:5173',credentials:true}));
// application
app.use("/api/products", BicycleRoutes);
app.use('/api/orders', OrderRoutes); 
const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
  res.status(200).json({
    message:'Welcome to The Bicycle store'
  })
};

app.get("/", getAController);

export default app;
