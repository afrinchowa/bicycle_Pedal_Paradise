import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycle/bicycle.route';
// import { OrderRoutes } from './modules/order/order.routes';
import { UserRoutes } from './app/modules/user/user.route';
import authRoute from './app/modules/auth/auth.route';
import orderRouter from './app/modules/order/order.router';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
// import cookieParser from 'cookie-parser';  // If you plan to use cookies, uncomment this

const app: Application = express();

// parser
app.use(express.json());
// app.use(cookieParser());  // Uncomment if cookies are to be used

// CORS setup
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://cycle-sphere-eight.vercel.app',
      'https://cycle-sphere.vercel.app',
      // more live links from more branches
    ],
    credentials: true,
  }),
);

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', UserRoutes);
app.use('/api/products', BicycleRoutes);
app.use('/api', orderRouter);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server live',
  });
});

app.use(globalErrorHandler);

export default app;
