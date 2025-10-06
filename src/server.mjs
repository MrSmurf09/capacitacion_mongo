import express from 'express';
import path from 'path';
import envs from './envs/environments.mjs';
import { engine } from 'express-handlebars';
import indexRoutes from './routes/index.routes.mjs';
import notesRoutes from './routes/notes.routes.mjs';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import expressSession from 'express-session';
import userRoutes from './routes/user.routes.mjs';
import { fileURLToPath } from 'url';
import passport from 'passport';
import './config/passport.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Initializations
const app = express();

// Settings
app.set('port', envs.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  extname: '.hbs',
  layoutsDir: app.get('views') + '/layouts',
  partialsDir: app.get('views') + '/partials',
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', indexRoutes);

app.use('/notes', notesRoutes);

app.use('/auth', userRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

export default app;