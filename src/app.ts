import express from 'express';
import path from 'path';
import routes from './routes';
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes.home);
app.use('/sign-up', routes.signup);
app.use('/user', routes.user);
export default app;
