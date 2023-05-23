import userRoute from './userRoute';

import authRoute from './authRoute';

function route (app) {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoute);
}

export default route;
