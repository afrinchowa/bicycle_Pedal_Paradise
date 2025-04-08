import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './modules/bicycle/bicycle.route';
import { OrderRoutes } from './modules/order/order.routes';
import { UserRoutes } from './app/modules/user/user.route';
import authRoute from './app/modules/auth/auth.route';
// import cookieParser from 'cookie-parser';  // If you plan to use cookies, uncomment this

const app: Application = express();

// parser
app.use(express.json());
// app.use(cookieParser());  // Uncomment if cookies are to be used

// CORS setup
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Routes
app.use("/api/auth",authRoute );
app.use("/api/users", UserRoutes);
app.use("/api/products", BicycleRoutes);
app.use('/api/orders', OrderRoutes);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server live'
  });
});

export default app;
