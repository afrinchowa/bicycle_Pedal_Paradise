import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';

import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
 
  {
    path: '/admins',
    route: AdminRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
