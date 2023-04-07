const userRoute = require('./userRouter');

function route(app)
{

    app.use('/user',userRoute);

}

module.exports = route;