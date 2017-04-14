import 'babel-polyfill';
import path from 'path';
import Koa from 'koa';
import send from 'koa-send';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import convert from 'koa-convert';
import mongoose from 'mongoose';
import views from 'koa-nunjucks-next';

import routes from './routes';
import { renderReact } from './render';

const app = new Koa();

// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

app.use(bodyParser());

// session
app.keys = ['forever'];
app.use(convert(session(app)));

app.use(views('../../views'));
app.use(async (ctx, next) => {
    await send(ctx, ctx.path, { root: path.resolve(__dirname, '../../static') });

    if (ctx.status === 404) {
        await next();
    }
});

routes(app);
app.use(renderReact);

app.listen(8080, () => console.log('Server is running on 8080'));

