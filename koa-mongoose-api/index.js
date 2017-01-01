import 'babel-polyfill';
import consign from 'consign';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import config from './config.js';
import mongoose from 'mongoose';
import Bluebird from 'bluebird';


const app = koa();

mongoose.connect(config.mongodb.uri);
mongoose.Promise = Bluebird;

app.use(bodyParser());


consign(config.consign)
  .include('models')
  .then('routes')
  .into(app)
;

app.use(compress());

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Koa-mongoose TODO  API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;