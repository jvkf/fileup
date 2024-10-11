import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import path from 'path';
import strategy from './config/passport';
import session from './config/session-cookie';
import allowedPaths from './middleware/allowed-paths';
import errorHandler from './middleware/error-handler';
import storeUser from './middleware/store-user';
import routes from './routes';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
        styleSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: {
      policy: 'same-origin',
    },
    crossOriginResourcePolicy: { policy: 'same-origin' },
  })
);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);
app.use(storeUser);
app.use(allowedPaths);

app.use('/', routes.home);
app.use('/signup', routes.signup);
app.use('/login', routes.login);
app.use('/logout', routes.logout);
app.use('/user', routes.user);
app.use('/user/folders', routes.folders);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).render('404');
});

export default app;
