import { Hono } from 'hono';
import { DatabaseEnv } from './database';

const app = new Hono();

import contacts from './endpoints/contacts';
app.route("/contacts", contacts);
import login from './endpoints/login';
app.route("/login", login);
import similarUsernames from './endpoints/similarUsernames';
app.route("/similarUsernames", similarUsernames);

export default app;
