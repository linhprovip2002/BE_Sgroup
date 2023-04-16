const userRoute = require('./userRouter');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
function route(app)
{

    app.use('/user',userRoute);
    app.use('/category',categoryRoute);
    app.use('/product',productRoute);

}

module.exports = route;