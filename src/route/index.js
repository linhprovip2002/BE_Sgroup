import userRoute from './v1/userRoute';
import authRoute from './v1/authRoute';
import userRoute2 from './v2/userRoute';
import authRoute2 from './v2/authRoute';

function route (app) {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v2/users', userRoute2);
  app.use('/api/v2/auth', authRoute2);
}

export default route;
